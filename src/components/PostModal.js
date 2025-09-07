import {useState} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    const reset = (e) => {
        setEditorText("");
        props.handleClick(e);
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
          <img src="/images/user.svg" alt="" />
          <span>Guest User</span>
        </UserInfo>
        <Editor>
          <textarea
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            placeholder="What do you want to talk about?"
            autoFocus={true}
          ></textarea>
        </Editor>
      </SharedContent>

      <ShareCreation>
        <AttachAssets>
          <AssetButton>
            <FontAwesomeIcon icon={faImage} />
          </AssetButton>
          <AssetButton>
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

        <PostButton >Post</PostButton>
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
export default PostModal;