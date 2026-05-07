@echo off
cd /d D:\PlayWright_Practice
npx playwright test flipkart-tshirt-search.spec.ts --reporter=list
pause
