#!/bin/bash

# Initialize run number (starts at 01, auto-increments)
RUN_NUMBER="01"
TEST_NAME=""
CONDITION=""

# ─────────────────────────────────────────────
# ENVIRONMENT SETUP (first run only)
# ─────────────────────────────────────────────
echo
echo "ENVIRONMENT SETUP"
echo "================="
echo

# 1. Check last reboot time
echo "Checking system uptime..."
UPTIME_SECONDS=$(sysctl -n kern.boottime | awk '{print $4}' | sed 's/,//')
CURRENT_TIME=$(date +%s)
UPTIME_HOURS=$(( (CURRENT_TIME - UPTIME_SECONDS) / 3600 ))

if [ $UPTIME_HOURS -lt 2 ]; then
    echo "🟢 System rebooted recently ($UPTIME_HOURS hours ago)"
elif [ $UPTIME_HOURS -lt 24 ]; then
    echo "System uptime: $UPTIME_HOURS hours"
    echo "🟡 Recommendation: Acceptable, but consider rebooting if you encounter issues"
else
    UPTIME_DAYS=$(( UPTIME_HOURS / 24 ))
    echo "System uptime: $UPTIME_DAYS days"
    echo "🔴 Recommendation: Reboot before testing for cleanest results"
    echo
    read -p "Do you want to continue anyway? (y/n): " CONTINUE
    if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
        echo "Please reboot and run this script again."
        exec $SHELL -l
    fi
fi

# 2. Disable Spotlight indexing
echo
echo "Checking Spotlight status..."
if mdutil -s / 2>/dev/null | grep -q "Indexing disabled"; then
    echo "🟢 Spotlight indexing already disabled"
else
    echo "🟡 Disabling Spotlight indexing (will re-enable after testing)..."
    sudo mdutil -a -i off 2>/dev/null
    echo "🟢 Spotlight disabled"
fi

# 3. Check for heavy background processes
echo
echo "TOP 5 CPU CONSUMERS:"
echo "===================="
ps aux | sort -rk 3,3 | head -n 6 | tail -n 5 | awk '{printf "   %-20s %.1f%%\n", substr($11,1,20), $3}'

echo
echo "✋ BEFORE CONTINUING:"
echo "====================="
echo "   → Close any unnecessary apps listed above"
echo "   → Close any running applications aside from Chrome and this terminal"
echo "   → Close other browser tabs/windows"
echo
read -p "Press Enter when ready to continue."

echo
echo "🟢 Environment ready for testing"

# ─────────────────────────────────────────────
# MAIN TEST LOOP
# ─────────────────────────────────────────────
while true; do

    # 1. Configuration
    echo
    echo "TEST CONFIGURATION"
    echo "=================="
    echo

    # Only ask for test name on first run
    if [ -z "$TEST_NAME" ]; then
        read -p "Enter test name (e.g., Avoid_excessive_DOM_size): " TEST_NAME
    fi

    # On first run, ask for condition; after that it's set automatically by the loop
    if [ -z "$CONDITION" ]; then
        echo
        echo "Current run: $RUN_NUMBER"
        echo
        echo "Select condition:"
        echo "  1) Optimized"
        echo "  2) Unoptimized"
        echo
        read -p "Enter choice (1 or 2): " CONDITION_CHOICE
        if [ "$CONDITION_CHOICE" = "1" ]; then
            CONDITION="optimized"
        else
            CONDITION="unoptimized"
        fi
    fi

    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    OUTPUT_FILE="$HOME/Documents/SETU/Dissertation_Measurements/${TEST_NAME}_run${RUN_NUMBER}_${TIMESTAMP}_${CONDITION}.plist"

    # 2. Confirmation & Reminder
    echo
    echo "TEST SETUP:"
    echo "==========="
    echo "   Test: $TEST_NAME"
    echo "   Run: $RUN_NUMBER"
    echo "   Condition: $CONDITION"
    echo "   Output: $(basename "$OUTPUT_FILE")"
    echo
    echo
    echo "✋ BEFORE CONTINUING:"
    echo "====================="
    echo "→ Open the test page in Chrome"
    if [ "$CONDITION" = "optimized" ]; then
        echo "→ Toggle optimization ON (🟢)"
    else
        echo "→ Toggle optimization OFF (🔴)"
    fi
    echo "→ Make sure page is ready to refresh"
    echo
    read -p "Press Enter when ready to start measurement."

    # 3. Authentication
    echo
    echo "🔒 Please enter your password:"
    sudo -v

    # 4. Start caffeinate to prevent sleep/power management
    caffeinate -d -i &
    CAFFEINATE_PID=$!

    # 5. Refresh Chrome in the background (delayed by 0.5s)
    echo
    (sleep 0.5 && osascript -e 'tell application "Google Chrome" to reload active tab of window 1') &

    # 6. Start powermetrics (5 seconds at 100ms resolution)
    echo
    echo "Recording 5 seconds of data for: $TEST_NAME ($CONDITION, Run $RUN_NUMBER)"
    sudo powermetrics -i 100 -n 50 -f plist -o "$OUTPUT_FILE"

    # 7. Stop caffeinate (wait suppresses the "Terminated" job-control message)
    kill $CAFFEINATE_PID 2>/dev/null
    wait $CAFFEINATE_PID 2>/dev/null

    echo
    echo "👍 Done. Results saved to:"
    echo
    echo "$OUTPUT_FILE"
    echo

    # 8. Ask if user wants to continue
    read -p "Run another test? (y/n): " AGAIN

    if [[ ! "$AGAIN" =~ ^[Yy]$ ]]; then
        break
    fi

    # Determine next run number and condition
    if [ "$CONDITION" = "optimized" ]; then
        NEXT_RUN=$RUN_NUMBER
        NEXT_CONDITION="unoptimized"
        echo
        echo "NEXT TEST:"
        echo "=========="
        echo "Run: $NEXT_RUN (same)"
        echo "Condition: Unoptimized"
        echo "✋ Toggle optimization OFF (🔴)"
    else
        NEXT_RUN=$(printf '%02d' $((10#$RUN_NUMBER + 1)))
        NEXT_CONDITION="optimized"
        echo
        echo "NEXT TEST:"
        echo "=========="
        echo "Run: $NEXT_RUN (incremented)"
        echo "Condition: Optimized"
        echo "✋ Toggle optimization ON (🟢)"
    fi

    RUN_NUMBER=$NEXT_RUN
    CONDITION=$NEXT_CONDITION

    echo
    echo "Waiting 60 seconds for browser to settle."
    echo "========================================="
    echo

    # 60-second countdown; suppress stray background job output during countdown
    exec 3>&2 2>/dev/null
    for i in {60..1}; do
        printf "\r⏳ Time remaining: %02d seconds" $i
        sleep 1
    done
    exec 2>&3 3>&-
    printf "\r⌛ Browser settled, ready for next test.   \n"
    echo

done

# ─────────────────────────────────────────────
# CLEANUP
# ─────────────────────────────────────────────

echo
echo "Re-enabling Spotlight indexing."
sudo mdutil -a -i on 2>/dev/null
echo
echo "🟢 Spotlight re-enabled"
echo
echo "🙌 Testing complete"
echo "   Total runs completed: $RUN_NUMBER"
echo

# Drop back to an interactive terminal prompt instead of closing the window
exec $SHELL -l