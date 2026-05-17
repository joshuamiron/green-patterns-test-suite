#!/bin/bash

while true; do

    echo
    echo "📥 Drag and drop .plist files here, then press Enter:"
    read -r INPUT_FILES

    # eval lets the shell parse macOS drag-and-drop quoting correctly,
    # including paths that contain spaces
    eval "FILE_ARRAY=($INPUT_FILES)"

    if [ ${#FILE_ARRAY[@]} -eq 0 ]; then
        echo "🔴 No files provided"
        continue
    fi

    echo
    echo "Found ${#FILE_ARRAY[@]} file(s) to process"
    echo

    PROCESSED=0
    FAILED=0

    for INPUT_FILE in "${FILE_ARRAY[@]}"; do
        if [ -z "$INPUT_FILE" ]; then
            continue
        fi

        if [ ! -f "$INPUT_FILE" ]; then
            echo "🔴 File not found: $INPUT_FILE"
            FAILED=$((FAILED + 1))
            continue
        fi

        BASE_NAME=$(basename "$INPUT_FILE" .plist)
        DIR_NAME="${INPUT_FILE%.plist}_samples"

        if [ -d "$DIR_NAME" ]; then
            echo "⏭️  Skipping $BASE_NAME"
            echo "   Already split into: "
            echo "   $DIR_NAME"
            echo
            continue
        fi

        mkdir -p "$DIR_NAME"

        echo "⏳ Processing: $BASE_NAME"
        echo "   Output: "
        echo "   $DIR_NAME"

        perl -e '
            my $dir = $ARGV[0];
            my $file = $ARGV[1];
            my $base = $ARGV[2];

            open(my $fh, "<", $file) or die "Cannot open $file: $!";
            local $/ = undef;
            my $content = <$fh>;
            close($fh);

            my @samples = split(/(?=\<\?xml version)/, $content);

            my $count = 0;
            foreach my $sample (@samples) {
                next if $sample =~ /^\s*$/;
                $count++;
                my $out_file = sprintf("%s/%s_%03d.plist", $dir, $base, $count);
                open(my $out_fh, ">", $out_file) or die "Cannot write $out_file: $!";
                $sample =~ s/\0//g;
                print $out_fh $sample;
                close($out_fh);
            }
            print "   Created $count sample files\n";
        ' "$DIR_NAME" "$INPUT_FILE" "$BASE_NAME"

        PROCESSED=$((PROCESSED + 1))
        echo
    done

    echo "SUMMARY:"
    echo "========"
    echo "🙌 Processed: $PROCESSED file(s)"
    if [ $FAILED -gt 0 ]; then
        echo "🔴 Failed:    $FAILED file(s)"
    fi
    echo

    read -r -p "Split more files? (y/n): " AGAIN
    if [[ ! "$AGAIN" =~ ^[Yy]$ ]]; then
        break
    fi

done

echo
exec $SHELL -l