name: Build and Deploy Ionic App

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest 

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14

      - name: Install Dependencies
        run: |
          cd CeleSmart
          npm install
      - name: Build Ionic App
        run: |
          cd CeleSmart
          npm run build 
  
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Build Docker Image
        run: |
          docker build -t rp1103/test:${{ github.run_number }} -f CeleSmart/Dockerfile .
        
      - name: Log in to Docker Hub
        run: |
          docker login -u rp1103 -p Veeramathi@1
      - name: Push Docker Image
        run: |
          docker push rp1103/test:${{ github.run_number }}
        
      - name: Run Docker Container
        run: |
          docker run -d -p 8100:8100 rp1103/test:${{ github.run_number }} 
Update new.yml · RP1103/mart-application@9fdd2d2
