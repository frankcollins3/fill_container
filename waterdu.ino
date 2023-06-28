#define BLUE_WATER_PIN 13
#define RED_WARNING_PIN 9

void setup() {  
  // allow signal to PIN_13.
  pinMode(BLUE_WATER_PIN, OUTPUT);
  pinMode(RED_WARNING_PIN, OUTPUT);
  // wait for Serial to be available to begin.
  if (!Serial.available()) { } 
  Serial.begin(9600);
}

void loop() {
  // Main Arduino loop code
  Serial.println("Arduino is Water");
}

void reminderBrightConfirm() {
  // blue led blinker for when user successfully adheres to their schedule and updates one of their water cycle reminders in time.
   digitalWrite(BLUE_WATER_PIN, HIGH);
}

void reminderConfirmOff() {
  digitalWrite(BLUE_WATER_PIN, LOW);
}

void lessThanThirtyWarning() {
  //
  digitalWrite(RED_WARNING_PIN, HIGH);
}

void warningOff() {
  digitalWrite(RED_WARNING_PIN, LOW);
}
