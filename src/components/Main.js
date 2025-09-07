import styled from "styled-components";
import { FaUser, FaImage, FaVideo, FaCalendarAlt, FaEdit, FaGlobeAmericas, FaThumbsUp, FaComment, FaRetweet, FaShare } from 'react-icons/fa';
import PostModal from "./PostModal";
import { useState } from "react";

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        border-radius: 8px;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        margin-left: 8px;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      justify-content: space-evenly;
      padding: 8px 50px;

      button {
        padding: 12px 16px;
        margin: 0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        min-height: 40px;
        transition: all 0.2s ease;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }
        
        svg {
          margin-right: 6px;
          flex-shrink: 0;
        }
        
        span {
          color: rgba(0, 0, 0, 0.8);
          font-weight: 500;
          font-size: 13px;
          white-space: nowrap;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 8px;
  }
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n+1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.6);
  }
`;
const Description = styled.div`
  padding: 16px 16px 12px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
  line-height: 1.5;
  white-space: pre-line;
  word-wrap: break-word;
  
  span {
    color: #0a66c2;
    font-weight: 600;
  }
  
  ul {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 4px 0;
    list-style-type: disc;
  }
  
  p {
    margin: 8px 0;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 4px;
    }
  }
`;

const SharedImg = styled.div`
  margin: 0;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  a {
    display: block;
    position: relative;
    
    &:hover img {
      opacity: 0.95;
      transition: opacity 0.2s ease;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 300px;
    display: block;
    background-color: #f0f2f5;
    border-radius: 0;
  }
`;
const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  
  li {
    margin-right: 5px;
    font-size: 12px;
    
    button {
      display: flex;
      border: none;
      background: transparent;
      cursor: pointer;
      align-items: center;
      
      img {
        width: 18px;
        height: 18px;
      }
      
      span {
        margin-left: 4px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 600;
      }
    }
  }
  
  a {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: rgba(0, 0, 0, 0.6);
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
      color: rgba(0, 0, 0, 0.9);
    }
    
    svg {
      margin-right: 6px;
      flex-shrink: 0;
    }
    
    span {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;


const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  
  const handleClick = (e) => {  
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };


  return <Container>
    <ShareBox>Share
    <div>
      <FaUser size={48} color="#666" style={{borderRadius: '50%', padding: '8px', backgroundColor: '#f0f0f0'}}/>
     <button onClick={handleClick}>Start a post</button>
     </div>
   
    <div>
     <button><FaImage size={20} color="#70b5f9"/> <span>Photo</span></button>
      <button><FaVideo size={20} color="#2aa732"/> <span>Video</span></button>
      <button><FaCalendarAlt size={20} color="#f59e0b"/> <span>Event</span></button>
      <button><FaEdit size={20} color="#ef4444"/> <span>Write article</span></button>
    </div>
    </ShareBox>
    <div>
      <Article>
        <SharedActor>
          <a>
           <FaUser size={48} color="#666" style={{borderRadius: '50%', padding: '8px', backgroundColor: '#f0f0f0'}}/>
          <div>
            <span>John Doe</span>
            <span>Software Engineer at TechCorp</span>
            <span>1d • <FaGlobeAmericas /></span>
          </div>
          </a>
          <button>•••</button>
        </SharedActor>
       <Description>
  🚀 Exciting news in the crypto space! Bitcoin just hit a new monthly high, and institutional adoption continues to grow. 
  
  Key highlights from this week:
  • MicroStrategy adds another 5,000 BTC to their treasury 
  • Major banks are now offering crypto custody services
  • DeFi protocols see 40% increase in TVL
  
  The future of finance is becoming more decentralized every day. What are your thoughts on the current market trends? 
  
  #Bitcoin #Cryptocurrency #DeFi #Blockchain #FinTech #Investment
</Description>
<SharedImg>
  <a>
    <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop&crop=center" alt="Bitcoin and cryptocurrency trading chart" />
  </a>
</SharedImg>
<SocialCount>
  <li>
    <button>
      <img src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="Like icon" />
      <img src="/images/clapping.svg" alt="Clap icon" />
      <span>75</span>
    </button>
  </li>
  <li>
    <a>24 comments</a>
  </li>
</SocialCount>
<SocialActions>
  <button>
  <FaThumbsUp size={16} color="#666" /> Like
</button>
<button>
  <FaComment size={16} color="#666" /> Comment  
</button>
<button>
  <FaRetweet size={16} color="#666" /> Repost
</button>
<button>
  <FaShare size={16} color="#666" /> Share
</button>
</SocialActions>
  </Article>
    </div>
    <PostModal showModal={showModal} handleClick={handleClick}/>
  </Container>;
  
};

export default Main;