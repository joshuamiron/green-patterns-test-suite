#!/bin/bash
cd "$(dirname "$0")"

while true; do

    # Folder A — retry until valid
    while true; do
        echo
        echo "📥 Drag and drop Folder 1 (Optimized) here, then press Enter:"
        read -r RAW_A
        eval "FOLDER_A=($RAW_A)"
        FOLDER_A="${FOLDER_A[0]}"

        if [ -z "$FOLDER_A" ]; then
            echo "🔴 No folder provided, try again."
            continue
        fi

        if [ ! -d "$FOLDER_A" ]; then
            echo "🔴 Not a folder: $FOLDER_A"
            continue
        fi

        break
    done

    # Folder B — retry until valid, without losing Folder A
    while true; do
        echo
        echo "📥 Drag and drop Folder 2 (Unoptimized) here, then press Enter:"
        read -r RAW_B
        eval "FOLDER_B=($RAW_B)"
        FOLDER_B="${FOLDER_B[0]}"

        if [ -z "$FOLDER_B" ]; then
            echo "🔴 No folder provided, try again."
            continue
        fi

        if [ ! -d "$FOLDER_B" ]; then
            echo "🔴 Not a folder: $FOLDER_B"
            continue
        fi

        break
    done

    # Extract base folder names
    FOLDER_A_NAME=$(basename "$FOLDER_A")
    FOLDER_B_NAME=$(basename "$FOLDER_B")

    # Extract test name + run number and timestamp from folder A name
    # e.g. Avoid_excessive_DOM_size_run01_20260310_174928_optimized_samples
    TEST_NAME_AND_RUN=$(echo "$FOLDER_A_NAME" | sed -E 's/_[0-9]{8}_[0-9]{6}_.*//')
    TIMESTAMP=$(echo "$FOLDER_A_NAME" | sed -E 's/.*_([0-9]{8}_[0-9]{6})_.*/\1/')
    # Create output filename
    OUTPUT_CSV="${TEST_NAME_AND_RUN}_${TIMESTAMP}_comparison.csv"

    echo
    echo "👉 Creating CSV: $OUTPUT_CSV"
    echo "   Optimized:    $FOLDER_A_NAME"
    echo "   Unoptimized:  $FOLDER_B_NAME"
    echo
    
    # Write CSV header row to file (not printed to terminal)
    echo "Sample_Number,Opt_Chrome_CPU_ms,Opt_Chrome_PID_Count,Unopt_Chrome_CPU_ms,Unopt_Chrome_PID_Count,Opt_Network_Bytes,Unopt_Network_Bytes" > "$OUTPUT_CSV"

    echo "⏳ Processing samples..."
    for i in {1..50}; do
        NUM=$(printf "%03d" $i)

        # Extract Chrome CPU time AND count of Chrome processes
        CHROME_A=$(awk '
            /Google Chrome/ {chrome=1; next}
            chrome && /cputime_ms_per_s/ {
                getline
                gsub(/[^0-9.]/, "")
                sum += $0
                count++
                chrome = 0
            }
            END {printf "%.2f,%d", sum, count}
        ' "$FOLDER_A"/*_$NUM.plist 2>/dev/null)

        CHROME_B=$(awk '
            /Google Chrome/ {chrome=1; next}
            chrome && /cputime_ms_per_s/ {
                getline
                gsub(/[^0-9.]/, "")
                sum += $0
                count++
                chrome = 0
            }
            END {printf "%.2f,%d", sum, count}
        ' "$FOLDER_B"/*_$NUM.plist 2>/dev/null)

        # Extract network inbound bytes
        NETWORK_A=$(grep -A 1 "<key>ibytes</key>" "$FOLDER_A"/*_$NUM.plist 2>/dev/null | grep "<integer>" | sed 's/[^0-9]//g')
        NETWORK_B=$(grep -A 1 "<key>ibytes</key>" "$FOLDER_B"/*_$NUM.plist 2>/dev/null | grep "<integer>" | sed 's/[^0-9]//g')

        echo "$NUM,$CHROME_A,$CHROME_B,${NETWORK_A:-0},${NETWORK_B:-0}" >> "$OUTPUT_CSV"

        if (( i % 10 == 0 )); then
            echo "   Processed $i/50 samples."
        fi
    done

    echo
    echo "🙌 Done: $OUTPUT_CSV"
    echo
    echo "CSV COLUMNS:"
    echo "============"
    echo "B: Opt Chrome CPU (ms/s)"
    echo "C: Opt Chrome Process Count"
    echo "D: Unopt Chrome CPU (ms/s)"
    echo "E: Unopt Chrome Process Count"
    echo "F: Opt Network Bytes"
    echo "G: Unopt Network Bytes"
    echo

    read -r -p "Do you want to create another CSV comparison? (y/n): " AGAIN
    if [[ ! "$AGAIN" =~ ^[Yy]$ ]]; then
        break
    fi

done

echo
exec $SHELL -l