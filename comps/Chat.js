import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipEmail from '../utils/getRecipEmail';

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipEmail(users, user))
  );
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  const recip = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipEmail(users, user);

  return (
    <Container onClick={enterChat}>
      {recip ? (
        <UserAvatar src={recip?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}

      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #f4f4f4;
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
    padding: 8px;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
