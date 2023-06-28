#define WATER_PIN 13

void setup() {  
  // allow signal to PIN_13.
  pinMode(BLUE_WATER_PIN, OUTPUT);
  // wait for Serial to be available to begin.
  if (!Serial.available()) { } 
  Serial.begin(9600);
}

void loop() {
  // Main Arduino loop code
  Serial.println("Arduino is Water");
}

// Functions to control LEDs based on received Pokemon type
void electricTypeLED() {
  digitalWrite(YELLOW_LED_PIN, HIGH);
  // Additional code for handling electric type
}

void reminderBrightConfirm() {
   digitalWrite(BLUE_WATER_PIN, HIGH);
}

void reminderConfirmOff() {
  digitalWrite(BLUE_WATER_PIN, LOW);
}
