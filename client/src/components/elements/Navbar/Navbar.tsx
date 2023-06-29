.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;  
  }
  
  .navbar-container img {
    padding: 0.125em;
    height: 50px;
    width: 50px;
    margin: 0 0.25em;
    border-radius: 50%;
    border: none;
  }
    
  .navbar-container img:hover {
    border: 1px dashed #72d3fe;
    cursor: pointer;
  }

  .middle {
    border: 5px solid green;
  }
  
  .test { border: 5px solid hotpink; }

  .Msg-Bottle-Animation {
    animation-name: Boop;navbar
    animation-duration: 4s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;    
  }

  @keyframes Boop {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(45deg);
    }
    75% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @media only screen and (max-width: 800px) {
    .navbar-container {
      padding: 0 2em;
      /* justify-content: center; */
    }
  }

  @media only screen and (max-width: 600px) {
    .navbar-container {
      padding: 0 2em;
      /* justify-content: center; */
    }    
  }

