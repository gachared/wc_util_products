import { FC } from 'react';
import SkuInput from './components/SkuInput';
import { Container } from '@mui/material';

const App: FC = () => {
  return (
    <Container>
      <SkuInput codeType='おすすめ' codeKey='recommend' />
      <SkuInput codeType='ランキング' codeKey='ranking' />
    </Container>
  );
};

export default App;
