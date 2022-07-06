import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
export default renderWithRouter;

// essa função foi criada seguindo o modelo do course no conteúdo Testando React Router, 15.3;
// é uma função helper que executa uma tarefa específica e não depende de outras funções;
// aqui criará um histórico e renderizará o componente que testaremos.
