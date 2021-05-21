import { Circle } from 'better-react-spinkit';
import TextsmsIcon from '@material-ui/icons/Textsms';
import { MdWhatshot } from 'react-icons/md';

function Loading() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <div style={{ marginBottom: 15 }}>
          <MdWhatshot size='150' color='red' />
        </div>
        <Circle color='red' size={60} />
      </div>
    </center>
  );
}

export default Loading;
