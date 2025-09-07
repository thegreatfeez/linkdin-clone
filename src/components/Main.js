import styled from "styled-components";
import { FaUser, FaImage, FaVideo, FaCalendarAlt, FaEdit, FaGlobeAmericas, FaThumbsUp, FaComment, FaRetweet, FaShare } from 'react-icons/fa';
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import dummyPosts from "./dummyPosts";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";

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
      
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 8px;
      }
      
      .user-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        padding: 8px;
        background-color: #f0f0f0;
        margin-right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        
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
    cursor: pointer;

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
    cursor: pointer;
    
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  & > img {
    width: 30px;
    height: 30px;
    align-self: center;
    margin: 20px 0;
  }
`;  

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    if (props.getArticles) {
      props.getArticles();
    }
  }, [props.getArticles]);
  
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

  return (
    <Container>
      <ShareBox>
        <div>
          {props.user ? (
            <img 
              src={props.user.photoURL || props.user.picture || '/images/user.svg'} 
              alt="User" 
              onError={(e) => {
                e.target.src = '/images/user.svg';
              }}
            />
          ) : (
            <div className="user-icon">
              <FaUser size={24} color="#666" />
            </div>
          )}
          <button 
            onClick={handleClick} 
            disabled={props.loading}
          >
            Start a post
          </button>
        </div>
       
        <div>
          <button>
            <FaImage size={20} color="#70b5f9" /> 
            <span>Photo</span>
          </button>
          <button>
            <FaVideo size={20} color="#2aa732" /> 
            <span>Video</span>
          </button>
          <button>
            <FaCalendarAlt size={20} color="#f59e0b" /> 
            <span>Event</span>
          </button>
          <button>
            <FaEdit size={20} color="#ef4444" /> 
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      
      <Content>
        {props.loading && <img src="/images/spinner.svg" alt="Loading" />}
        {dummyPosts && dummyPosts.length > 0 && dummyPosts.map(post => (
          <Article key={post.id}>
            <SharedActor>
              <a>
                <img src={post.actor.image} alt={post.actor.name} />
                <div>
                  <span>{post.actor.name}</span>
                  <span>{post.actor.title}</span>
                  <span>{post.actor.time} • <FaGlobeAmericas /></span>
                </div>
              </a>
              <button>•••</button>
            </SharedActor>
            
            <Description>
              {post.description}
            </Description>
            
            {post.sharedImg && (
              <SharedImg>
                <a>
                  <img src={post.sharedImg} alt="Post content" />
                </a>
              </SharedImg>
            )}
            
            <SocialCount>
              <li>
                <button>
                  <img src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="Like icon" />
                  <img src="/images/clapping.svg" alt="Clap icon" />
                  <span>{post.socialCounts?.likes || 0}</span>
                </button>
              </li>
              <li>
                <a>{post.socialCounts?.comments || 0} comments</a>
              </li>
            </SocialCount>
            
            <SocialActions>
              <button>
                <FaThumbsUp size={16} color="#666" /> 
                <span>Like</span>
              </button>
              <button>
                <FaComment size={16} color="#666" /> 
                <span>Comment</span>
              </button>
              <button>
                <FaRetweet size={16} color="#666" /> 
                <span>Repost</span>
              </button>
              <button>
                <FaShare size={16} color="#666" /> 
                <span>Send</span>
              </button>
            </SocialActions>
          </Article>
        ))}
      </Content>
      
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};


const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.user,
    articles: state.articleState.articles,
  };
};


const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);