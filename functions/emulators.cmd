set GOOGLE_APPLICATION_CREDENTIALS=./permissions.json
set FIRESTORE_EMULATOR_HOST=localhost:5001
firebase emulators:start --only firestore,functions --import ./.firestore --export-on-exit