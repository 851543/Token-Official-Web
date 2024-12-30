<template>
    <div class="not-found-container">
      <div class="not-found">
        <div class="not-found-content">
          <div class="error-code">404</div>
          <div class="divider">|</div>This page could not be found.
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .not-found-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
  }
  
  .not-found {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .not-found-content {
    display: flex;
    align-items: center;
    gap: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .error-code {
    font-size: 32px;
    font-weight: 500;
    color: #000;
    line-height: 1;
  }
  
  .divider {
    color: #eaeaea;
    font-weight: 200;
    font-size: 24px;
  }
  
  @media (max-width: 600px) {
    .not-found-content {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }
    
    .divider {
      display: none;
    }
  }
  </style>