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
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    min-height: 50vh;
    min-width: 50vw;
    background-color: #dedede70;
    border: 1px dashed #72d3fe;
    padding: 2em;
}

.google-container {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin-top: 1em; */
}

.google-container > :first-child {
    opacity: 0.0001;
}

.Login-Signup-Btn {
  height: 2em;
  width: 5em;
  /* border-radius: 40%; */
  border: none;
  border-bottom: 3px dashed #72d3fe;
  margin: 0 1.275em;
  font-family: 'Moon Dance', cursive;
  font-size: 32px;
  background-color: #dedede70;
/* font-weight: bolder; */
  color: silver;
  text-align: center;
}

.Login-Signup-Btn:hover {
  font-weight: bolder;
}

.submit-faucet {
  align-self: center;
  border: none;
  border-radius: 0%;
}

/* .submit-faucet:hover { cursor: pointer; } */

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
  /* margin-top: 0.75em; */
}

input:focus {
  border: 1px dashed #72d3fe;
}

#invisible { color: transparent; }
#bluespan { color: #72d3fe; }
#gspan { color: #4285f4; }
#red_o_span { color: #EA4335; }
#yellow_o_span { color: #FBBC05; }
#lil_g_span { color: #4285f4; }
#l_span { color: #34A853}
#e_span { color: #EA4335; }

.googleLinkBtnClass {
  border: 5px solid hotpink;
}

#google-link-btn {
  /* display: grid; */
  /* grid-template-columns: 30% 30%; */
  width: 50%;
  justify-content: space-between;
  align-items: center;
  /* border: 5px solid orange; */
}


h1 { color: silver; }     h1:hover { font-weight: bolder;}

pre {
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
}
