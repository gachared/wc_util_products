import { FC } from 'react';
import SkuInput from './components/SkuInput';
import { Container, Divider } from '@mui/material';

const App: FC = () => {
  return (
    <Container>
      <h2>おすすめ・ランキング設定</h2>
      <span>英数字または半角記号の「-」と「_」のみ入力可能です</span>
      <SkuInput codeType='おすすめ' codeKey='recommend' />
      <Divider sx={{ marginY: 3 }} />
      <SkuInput codeType='ランキング' codeKey='ranking' />
    </Container>
  );
};

export default App;
