import {useState} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import {connect} from "react-redux";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions";


import {
  faXmark,
  faImage,
  faVideo,
  faCalendarDays,
  faFileLines,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const PostModal = (props) => {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showVideoInput, setShowVideoInput] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const getVideoThumbnail = (url) => {
      
        const youtubeId = getYouTubeVideoId(url);
        if (youtubeId) {
            return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
        }
        
       
        const vimeoId = getVimeoVideoId(url);
        if (vimeoId) {
            return `https://vumbnail.com/${vimeoId}.jpg`;
        }
        
        return null;
    };

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getVimeoVideoId = (url) => {
        const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/)|(video\/))?([0-9]+)/;
        const match = url.match(regExp);
        return match ? match[6] : null;
    };

    const getVideoType = (url) => {
        if (getYouTubeVideoId(url)) return 'youtube';
        if (getVimeoVideoId(url)) return 'vimeo';
        if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
        if (url.includes('twitch.tv')) return 'twitch';
        if (url.includes('dailymotion.com')) return 'dailymotion';
        if (url.includes('tiktok.com')) return 'tiktok';
        if (url.match(/\.(mp4|webm|ogg|mov|avi)$/i)) return 'direct';
        return 'other';
    };

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not an image, the file is a ${typeof image}`);
            return;
        }
        setShareImage(image);
    };

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setShowImageUpload(false);
        setShowVideoInput(false);
        setIsVideoPlaying(false);
        props.handleClick(e);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };

        props.postArticle(payload);
        reset(e);
    };

  return (
    <>
    {props.showModal === "open" &&
  <Container>
    <Content>
      <Header>
        <h2>Create a post</h2>
        <button onClick={(event) => reset(event)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </Header>

      <SharedContent>
        <UserInfo>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          ) }
          <span>{props.user.displayName}</span>
        </UserInfo>
        <Editor>
          <textarea
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            placeholder="What do you want to talk about?"
            autoFocus={true}
          />

{showImageUpload && (
<UploadImage>
  <input
    type="file"
    accept="image/gif, image/jpeg, image/png"
    name="image"
    id="file"
    style={{ display: "none" }}
    onChange={handleChange}
  />
  <p>
    <label htmlFor="file">
      <FontAwesomeIcon icon={faImage} /> Select an image to share
    </label>
  </p>

  {shareImage && (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={URL.createObjectURL(shareImage)}
        alt="preview"
        style={{ maxWidth: "100%", borderRadius: "8px" }}
      />
      <button
        onClick={() => setShareImage(null)}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "rgba(0,0,0,0.6)",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          padding: "4px 6px",
        }}
      >
        <FontAwesomeIcon icon={faXmark} style={{ color: "white" }} />
      </button>
    </div>
  )}
</UploadImage>
)}

{showVideoInput && (
<VideoUpload>
  <input 
    type="text"
    placeholder="Enter a video link (YouTube, Vimeo, etc.)"
    value={videoLink}
    onChange={(e) => setVideoLink(e.target.value)}
  />
  {videoLink && videoLink.trim() !== "" && (
    <div style={{ position: "relative", marginTop: "12px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "8px", 
        padding: "8px 12px",
        backgroundColor: "#f8f9fa",
        borderRadius: "4px",
        fontSize: "12px" 
      }}>
        <span style={{ color: "#666" }}>
          Video Preview ({getVideoType(videoLink).charAt(0).toUpperCase() + getVideoType(videoLink).slice(1)})
        </span>
        <a 
          href={videoLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: "#0a66c2", textDecoration: "none" }}
        >
          🔗 Open in new tab
        </a>
      </div>
      <div style={{ position: "relative", backgroundColor: "#000", borderRadius: "8px", overflow: "hidden" }}>
        {!isVideoPlaying ? (
          <div 
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setIsVideoPlaying(true)}
          >
            {getVideoThumbnail(videoLink) ? (
              <img
                src={getVideoThumbnail(videoLink)}
                alt="Video thumbnail"
                style={{ 
                  width: "100%", 
                  height: "240px", 
                  objectFit: "cover",
                  display: "block"
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div style={{
              display: getVideoThumbnail(videoLink) ? "none" : "flex",
              width: "100%",
              height: "240px",
              backgroundColor: "#1a1a1a",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "white"
            }}>
              <div style={{
                fontSize: "48px",
                marginBottom: "12px"
              }}>
                {getVideoType(videoLink) === 'vimeo' && '📹'}
                {getVideoType(videoLink) === 'facebook' && '📘'}
                {getVideoType(videoLink) === 'twitch' && '🎮'}
                {getVideoType(videoLink) === 'dailymotion' && '🎬'}
                {getVideoType(videoLink) === 'tiktok' && '🎵'}
                {getVideoType(videoLink) === 'direct' && '🎥'}
                {getVideoType(videoLink) === 'other' && '📺'}
              </div>
              <div style={{ fontSize: "14px", textAlign: "center", opacity: 0.8 }}>
                {getVideoType(videoLink).charAt(0).toUpperCase() + getVideoType(videoLink).slice(1)} Video
                <br />
                <span style={{ fontSize: "12px" }}>Click to play</span>
              </div>
            </div>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60px",
              height: "60px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
            }}>
              <div style={{
                width: "0",
                height: "0",
                borderLeft: "20px solid #ff0000",
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                marginLeft: "4px"
              }}></div>
            </div>
          </div>
        ) : (
          <ReactPlayer 
            width={"100%"} 
            height="240px"
            url={videoLink.trim()}
            controls={true}
            playing={true}
            onEnded={() => setIsVideoPlaying(false)}
          />
        )}
        <button
          onClick={() => {
            setVideoLink("");
            setIsVideoPlaying(false);
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "rgba(0,0,0,0.8)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "8px",
            color: "white",
            fontSize: "14px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  )}
</VideoUpload>
)}

        </Editor>
      </SharedContent>

      <ShareCreation>
        <AttachAssets>
          <AssetButton onClick={() => {
            setShowImageUpload(!showImageUpload);
            setShowVideoInput(false);
          }}>
            <FontAwesomeIcon icon={faImage} />
          </AssetButton>
          <AssetButton onClick={() => {
            setShowVideoInput(!showVideoInput);
            setShowImageUpload(false);
          }}>
            <FontAwesomeIcon icon={faVideo} />
          </AssetButton>
          <AssetButton>
            <FontAwesomeIcon icon={faCalendarDays} />
          </AssetButton>
          <AssetButton>
            <FontAwesomeIcon icon={faFileLines} />
          </AssetButton>
        </AttachAssets>

        <ShareComment>
          <AssetButton>
            <FontAwesomeIcon icon={faCommentDots} />
            Anyone
          </AssetButton>
        </ShareComment>

        <PostButton disabled={!editorText ? true : false} 
        onClick={(event)=> postArticle(event)}>Post</PostButton>
      </ShareCreation>
    </Content>
  </Container>
}
  </>
);}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    background: transparent;
    outline: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 50%;
      cursor: pointer;
    }
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
    margin-right: 8px;
  }
    
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;

  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: none;
    outline: none;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  background: transparent;
  outline: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    cursor: pointer;
  }
  img {
    pointer-events: none;
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  ${AssetButton} {
    img {
      margin-right: 4px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.08)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1, 1, 1, 0.3)" : "white")};
  border: none;
  outline: none;
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
    height: auto;
    margin-top: 20px;
    border-radius: 5px;
  }
  p {
    font-size: 14px;
    color: #0a66c2;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const VideoUpload = styled.div`
  padding: 12px 0;
  input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    margin-bottom: 12px;
    outline: none;
    font-size: 14px;
    &:focus {
      border-color: #0a66c2;
    }
  }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);