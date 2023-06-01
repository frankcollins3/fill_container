@import url('https://fonts.googleapis.com/css2?family=Moon+Dance&family=Poppins:ital,wght@1,100&display=swap');
img {
    height: 50px;
    width: 50px;
    margin: 0 0.25em;
    border: 1px dashed #72d3fe;
    border-radius: 50%;
  }

.login-container {  
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 50vh;
    min-width: 50vw;
    background-color: #dedede70;
    border: 1px dashed #72d3fe;
}

.google-container {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1em;
}

.google-container > :first-child {
    opacity: 0.0001;
}

.Login-Signup-Btn {
  height: 50px;
  width: 5em;
  border-radius: 40%;
  border: 1px dashed #72d3fe;
  margin: 0 1.275em;
  font-family: 'Moon Dance', cursive;
  font-size: 22px;
  background-color: #dedede70;
/* font-weight: bolder; */
  color: silver;
}

.Login-Signup-Btn:hover {
  font-weight: bolder;
}

.row {
    align-self: space-between;
}

input {
  height: 2vw;
  width: 12vw;
  background-color: #dedede70;
  border: 1px dashed #dedede70;
  color: silver;
  text-align: center;
  margin-top: 0.55em;
}

input:focus {
  border: 1px dashed #72d3fe;
}
