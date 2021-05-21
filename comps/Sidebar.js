import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Chat from './Chat';

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      'Please enter an email address for a user to begin chatting'
    );

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatExists(input) &&
      input !== user.email
    ) {
      // check if chat exists then add chat to db
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };

  const chatExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats' />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.5;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media screen and (max-width: 450px) {
    min-width: 100px;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  @media screen and (max-width: 450px) {
    visibility: hidden;
  }
`;

const SidebarButton = styled(Button)`
  width: 100%;
  transition: all 0.2s ease-out;
  background-color: #fff;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    :hover {
      transition: all 0.2s ease-out;
      color: whitesmoke;
      background: linear-gradient(
        0deg,
        rgba(255, 89, 89, 1) 0%,
        rgba(190, 25, 25, 1) 20%,
        rgba(179, 33, 33, 1) 34%,
        rgba(130, 16, 16, 1) 45%,
        rgba(158, 21, 21, 1) 53%,
        rgba(191, 28, 28, 1) 60%,
        rgba(255, 82, 82, 0.9918656938531426) 98%
      );
    }
    @media screen and (max-width: 450px) {
      transform: translateY(-50%);
    }
  }
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  @media screen and (max-width: 450px) {
    transform: translateY(10%);
    flex-direction: column;
    border-bottom: none;
  }
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  @media screen and (max-width: 450px) {
    display: flex;
  }
`;
