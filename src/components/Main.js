import styled from "styled-components";
import { FaUser, FaImage, FaVideo, FaCalendarAlt, FaEdit, FaGlobeAmericas, FaThumbsUp, FaComment, FaRetweet, FaShare } from 'react-icons/fa';
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import dummyPosts from "./dummyPosts";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from 'react-player';

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

const SharedVideo = styled.div`
  margin: 0;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  
  .video-container {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .react-player {
      position: absolute;
      top: 0;
      left: 0;
    }
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
    
    &.liked {
      color: #0a66c2;
      background-color: rgba(10, 102, 194, 0.1);
    }
    
    &.reposted {
      color: #2aa732;
      background-color: rgba(42, 167, 50, 0.1);
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

const CommentSection = styled.div`
  padding: 16px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9e5df;
  
  .comment-input {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
    
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .comment-form {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        resize: vertical;
        min-height: 60px;
        font-family: inherit;
        
        &:focus {
          outline: none;
          border-color: #0a66c2;
        }
      }
      
      .comment-actions {
        display: flex;
        gap: 8px;
        
        button {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          
          &.post-btn {
            background-color: #0a66c2;
            color: white;
            border: none;
            
            &:hover {
              background-color: #004182;
            }
            
            &:disabled {
              background-color: #ccc;
              cursor: not-allowed;
            }
          }
          
          &.cancel-btn {
            background-color: transparent;
            color: #666;
            border: 1px solid #ddd;
            
            &:hover {
              background-color: #f0f0f0;
            }
          }
        }
      }
    }
  }
  
  .comments-list {
    .comment {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
      
      .comment-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .comment-content {
        flex: 1;
        background-color: white;
        padding: 12px;
        border-radius: 8px;
        position: relative;
        
        .comment-author {
          font-weight: 600;
          font-size: 13px;
          color: #333;
          margin-bottom: 4px;
        }
        
        .comment-text {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }
        
        .comment-time {
          font-size: 11px;
          color: #999;
          margin-top: 6px;
        }
        
        .comment-delete {
          position: absolute;
          top: 8px;
          right: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #999;
          font-size: 12px;
          padding: 4px;
          border-radius: 4px;
          
          &:hover {
            background-color: #f0f0f0;
            color: #d32f2f;
          }
        }
      }
    }
  }
`;

const isVideoUrl = (url) => {
  if (!url) return false;
  return ReactPlayer.canPlay(url);
};

const isImageUrl = (url) => {
  if (!url) return false;
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
  return imageExtensions.test(url) || 
         url.includes('image') || 
         url.includes('img') ||
         url.includes('photo') ||
         url.includes('picture');
};

const formatFirebaseArticle = (article) => {
  return {
    id: article.id,
    actor: {
      name: article.actor?.title || 'Unknown User',
      title: article.actor?.description || '',
      time: article.actor?.date ? new Date(article.actor.date.seconds * 1000).toLocaleDateString() : 'Unknown date',
      image: article.actor?.image || '/images/user.svg'
    },
    description: article.description || '',
    sharedImg: article.sharedImg || null,
    videoUrl: article.videoUrl || null, 
    socialCounts: {
      likes: article.likes || 0,
      comments: article.comments || 0
    }
  };
};

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  const [postStates, setPostStates] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComments, setNewComments] = useState({});

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

  const handleLike = (postId) => {
    setPostStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        liked: !prev[postId]?.liked,
        likes: prev[postId]?.liked 
          ? (prev[postId]?.likes || 0) - 1 
          : (prev[postId]?.likes || 0) + 1
      }
    }));
  };

  const handleComment = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId) => {
    const commentText = newComments[postId];
    if (!commentText?.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: props.user?.name || 'Anonymous User',
      avatar: props.user?.photoURL || props.user?.picture || '/images/user.svg',
      text: commentText.trim(),
      time: 'Just now',
      isOwn: true // Mark as user's own comment so they can delete it
    };

    setPostStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        comments: [...(prev[postId]?.comments || []), newComment],
        commentCount: (prev[postId]?.commentCount || 0) + 1
      }
    }));

    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPostStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        comments: (prev[postId]?.comments || []).filter(comment => comment.id !== commentId),
        commentCount: Math.max(0, (prev[postId]?.commentCount || 0) - 1)
      }
    }));
  };

  const handleCancelComment = (postId) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handleRepost = (postId) => {
    setPostStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        reposted: !prev[postId]?.reposted
      }
    }));
    
    alert('Post reposted to your timeline!');
  };

  const handleShare = (postId) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post',
        text: 'Interesting post from LinkedIn clone',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const getAllPosts = () => {
    const formattedFirebaseArticles = props.articles ? 
      props.articles.map(formatFirebaseArticle) : [];
    
    const allPosts = [...formattedFirebaseArticles, ...dummyPosts];
    
    return allPosts.sort((a, b) => {
      const dateA = new Date(a.actor.time);
      const dateB = new Date(b.actor.time);
      
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateB - dateA;
      }
      
      return 0;
    });
  };

  const allPosts = getAllPosts();

  const renderMediaContent = (post) => {
    if (post.videoUrl && isVideoUrl(post.videoUrl)) {
      return (
        <SharedVideo>
          <div className="video-container">
            <ReactPlayer
              className="react-player"
              url={post.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              light={false}
              pip={true}
              stopOnUnmount={false}
            />
          </div>
        </SharedVideo>
      );
    }
    
    if (post.sharedImg && isVideoUrl(post.sharedImg)) {
      return (
        <SharedVideo>
          <div className="video-container">
            <ReactPlayer
              className="react-player"
              url={post.sharedImg}
              width="100%"
              height="100%"
              controls={true}
              light={false}
              pip={true}
              stopOnUnmount={false}
            />
          </div>
        </SharedVideo>
      );
    }
    
    if (post.sharedImg && (isImageUrl(post.sharedImg) || !isVideoUrl(post.sharedImg))) {
      return (
        <SharedImg>
          <a>
            <img src={post.sharedImg} alt="Post content" />
          </a>
        </SharedImg>
      );
    }
    
    return null;
  };

  const getPostState = (postId) => {
    return postStates[postId] || {};
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
        {allPosts && allPosts.length > 0 && allPosts.map((post, index) => {
          const postId = post.id || `post-${index}`;
          const postState = getPostState(postId);
          const totalLikes = (post.socialCounts?.likes || 0) + (postState.likes || 0);
          const totalComments = (post.socialCounts?.comments || 0) + (postState.commentCount || 0);
          
          return (
            <Article key={postId}>
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
              
              {renderMediaContent(post)}
              
              <SocialCount>
                <li>
                  <button>
                    <img src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="Like icon" />
                    <img src="/images/clapping.svg" alt="Clap icon" />
                    <span>{totalLikes}</span>
                  </button>
                </li>
                <li>
                  <a>{totalComments} comments</a>
                </li>
              </SocialCount>
              
              <SocialActions>
                <button 
                  onClick={() => handleLike(postId)}
                  className={postState.liked ? 'liked' : ''}
                >
                  <FaThumbsUp size={16} color={postState.liked ? "#0a66c2" : "#666"} /> 
                  <span>Like</span>
                </button>
                <button onClick={() => handleComment(postId)}>
                  <FaComment size={16} color="#666" /> 
                  <span>Comment</span>
                </button>
                <button 
                  onClick={() => handleRepost(postId)}
                  className={postState.reposted ? 'reposted' : ''}
                >
                  <FaRetweet size={16} color={postState.reposted ? "#2aa732" : "#666"} /> 
                  <span>Repost</span>
                </button>
                <button onClick={() => handleShare(postId)}>
                  <FaShare size={16} color="#666" /> 
                  <span>Send</span>
                </button>
              </SocialActions>

              {showComments[postId] && (
                <CommentSection>
                  <div className="comment-input">
                    <img 
                      src={props.user?.photoURL || props.user?.picture || '/images/user.svg'} 
                      alt="Your avatar" 
                      className="user-avatar"
                      onError={(e) => {
                        e.target.src = '/images/user.svg';
                      }}
                    />
                    <div className="comment-form">
                      <textarea
                        placeholder="Add a comment..."
                        value={newComments[postId] || ''}
                        onChange={(e) => setNewComments(prev => ({
                          ...prev,
                          [postId]: e.target.value
                        }))}
                      />
                      <div className="comment-actions">
                        <button 
                          className="post-btn"
                          onClick={() => handleAddComment(postId)}
                          disabled={!newComments[postId]?.trim()}
                        >
                          Post
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelComment(postId)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="comments-list">
                    {postState.comments && postState.comments.map(comment => (
                      <div key={comment.id} className="comment">
                        <img 
                          src={comment.avatar} 
                          alt={comment.author} 
                          className="comment-avatar"
                          onError={(e) => {
                            e.target.src = '/images/user.svg';
                          }}
                        />
                        <div className="comment-content">
                          <div className="comment-author">{comment.author}</div>
                          <div className="comment-text">{comment.text}</div>
                          <div className="comment-time">{comment.time}</div>
                          {comment.isOwn && (
                            <button 
                              className="comment-delete"
                              onClick={() => handleDeleteComment(postId, comment.id)}
                              title="Delete comment"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CommentSection>
              )}
            </Article>
          );
        })}
      </Content>
      
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading, 
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);