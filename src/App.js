import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import FileUpload from './components/FileUpload'
import { useHistory } from "react-router-dom";

const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {

  const history = useHistory();
const generateObituary= (path) => {
  history.push(path);
  console.log("yo")
}


  return (


 
  <div class="flex-containerC">

<header class="site-header">
  <div class="wrapper site-header__wrapper">
    <button onClick={() => {generateObituary("/")}} class="brand  button-clear" style={{color: "#094067", marginLeft: 20}}> 𝙾𝚋𝚒𝚝𝚞𝚊𝚛𝚢 𝙼𝚊𝚔𝚎𝚛</button>
    <div class="flex-container navigation">
  
    <a href="/#about"  class="button button-clear" type="submit" style={{color: "#094067"}}> About </a>


 
    <a  href="/#work" class="button button-clear" type="submit" style={{color: "#094067"}}> How does it Work? </a>
 

    <a href="/generate" class="button" style={{marginRight:20}}>Create an Obituary</a>

    </div>
  </div>
</header>
<Route path="/" exact render={(props) =>
  (
    <div>
    <div class="entry">
  
  <span class="intro_text">Create and Host an Obituary for your loved one on the internet  
   </span>
   <br/>
   <br/>
   <span style={{fontSize: 30 + "px"}}>100% Free, No Account Required Lifetime Hosting </span> <br/>
  <button class="button-large" onClick={() => {generateObituary("/generate")}}>Create An Obituary</button>
  
  </div>
<div id="about" class="about">
<h1>  Mission Statement </h1>
  
  <div class="mission_statement">
    <h2> Focus on grieving not money</h2>
  Our goal is to let people host obituaries without having to worry about the cost

  </div>
  </div>

  <div id="work" class="faq"> <h1>How Does it Work? </h1>



  <h3>We use our custom template generator and then upload your website to the IPFS to ensure it remains on the internet.</h3>

</div>


    </div>
    
  )  
  }></Route>




    <Route path="/generate" exact render={(props) =>
  (
    <div className='container'>
    <FileUpload></FileUpload>
    </div>
    
  )  
  }></Route>

<div class="footer">
  <hr></hr>
 <h4>  𝙾𝚋𝚒𝚝𝚞𝚊𝚛𝚢 𝙼𝚊𝚔𝚎𝚛 </h4>
 <div> Resources
    <div class="footerR"> 
    <a class="button button-clear" href="https://docs.ipfs.io/concepts/what-is-ipfs/" type="submit"> What is the IPFS? </a>
    <a class="button button-clear" href="https://www.dignitymemorial.com/" type="submit"> Funeral Services </a>
    <a class="button button-clear" href="https://www.helpguide.org/articles/grief/coping-with-grief-and-loss.htm" type="submit"> Coping with Grief </a>
    </div>


 </div>
  
  
  </div>

  </div>

    // <div className="App">
    //   <h1>IPFS Example</h1>


    // </div>
  );
}

export default App;
