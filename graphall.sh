node test.js && ls out/*.csv | while read file; do python plotall.py $file & done
