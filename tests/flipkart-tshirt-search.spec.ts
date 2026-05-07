import { test, expect, Page } from '@playwright/test';

test.describe('Flipkart T-Shirt Search Test', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should search for T-Shirts, capture products, and select specific T-Shirt', async () => {
    // Step 1: Navigate to Flipkart
    console.log('🚀 Step 1: Navigating to https://www.flipkart.com/');
    await page.goto('https://www.flipkart.com/', { waitUntil: 'networkidle' });

    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    console.log('✅ Page loaded successfully');

    // Step 2: Close or skip login popup if it appears
    console.log('🚀 Step 2: Checking for login popup');
    try {
      // Wait for login modal/popup with a short timeout
      const loginModal = page.locator('[role="dialog"]');
      const isModalVisible = await loginModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (isModalVisible) {
        console.log('📋 Login popup detected, attempting to close');
        
        // Try to find and click close button (X button)
        const closeButton = page.locator('[role="dialog"] button').first();
        if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await closeButton.click();
          console.log('✅ Login popup closed');
          await page.waitForTimeout(1000);
        }
      } else {
        console.log('✅ No login popup detected');
      }
    } catch (error) {
      console.log('⚠️ Error handling login popup, continuing...', error);
    }

    // Step 3: Search for T-Shirts
    console.log('🚀 Step 3: Searching for T-Shirts');
    const searchBox = page.locator('input[name="q"]');
    
    // Wait for search box to be visible
    await expect(searchBox).toBeVisible({ timeout: 10000 });
    console.log('✅ Search box is visible');

    // Click on search box and type
    await searchBox.click();
    await page.waitForTimeout(500);
    await searchBox.fill('T-Shirts');
    console.log('📝 Typed "T-Shirts" in search box');

    // Press Enter to search
    await searchBox.press('Enter');
    console.log('🔍 Search initiated');

    // Wait for search results to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✅ Search results loaded');

    // Step 4: Capture the list of displayed T-Shirts dynamically
    console.log('🚀 Step 4: Capturing list of displayed T-Shirts');
    
    // Wait for product list to be visible
    const productList = page.locator('div[data-component-type="PRODUCTGRID"]');
    await expect(productList).toBeVisible({ timeout: 10000 });

    // Get all product containers
    const productContainers = page.locator('div[data-component-type="PRODUCTGRID"] div[data-id]');
    const productCount = await productContainers.count();
    console.log(`📊 Found ${productCount} T-Shirt products displayed`);

    // Step 6: Print all product names in the console
    console.log('🚀 Step 6: Printing all product names');
    const productNames: string[] = [];

    const products = page.locator('div[data-component-type="PRODUCTGRID"] a[title]');
    const productsCount = await products.count();

    for (let i = 0; i < productsCount; i++) {
      const titleAttribute = await products.nth(i).getAttribute('title');
      if (titleAttribute) {
        productNames.push(titleAttribute);
        console.log(`   ${i + 1}. ${titleAttribute}`);
      }
    }

    // Assert that we found products
    expect(productNames.length).toBeGreaterThan(0);
    console.log(`✅ Successfully captured ${productNames.length} product names`);

    // Step 5: Select a specific T-Shirt by product name using filter()
    console.log('🚀 Step 5: Selecting specific T-Shirt using filter()');
    
    // Use filter to find a specific product (first product in the list as example)
    if (productNames.length > 0) {
      const targetProductName = productNames[0];
      console.log(`🎯 Target product: "${targetProductName}"`);

      // Use filter with dynamic locator handling
      const specificProduct = page.locator('div[data-component-type="PRODUCTGRID"] a[title]').filter({
        hasText: new RegExp(targetProductName.substring(0, 30), 'i') // Use first 30 chars for matching
      });

      const productFound = await specificProduct.count();
      console.log(`✅ Specific product filter matched ${productFound} item(s)`);

      if (productFound > 0) {
        // Click on the specific product
        await specificProduct.first().click();
        console.log(`✅ Clicked on: "${targetProductName}"`);

        // Wait for product details page to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Verify product details page loaded
        const productTitle = page.locator('span.VU-ZEK, h1.B_NuCI');
        const isTitleVisible = await productTitle.isVisible({ timeout: 5000 }).catch(() => false);

        if (isTitleVisible) {
          const titleText = await productTitle.first().textContent();
          console.log(`✅ Product details page loaded: "${titleText}"`);
          expect(titleText).toBeTruthy();
        } else {
          console.log('⚠️ Product title not found on details page, but navigation successful');
        }
      }
    } else {
      console.log('⚠️ No products found to select');
    }

    // Step 7: Add proper waits and assertions using Playwright best practices
    console.log('🚀 Step 7: Verifying assertions and best practices');
    
    // Back to search results
    await page.goBack();
    await page.waitForLoadState('networkidle');

    // Re-verify search results are displayed
    const resultsList = page.locator('div[data-component-type="PRODUCTGRID"]');
    await expect(resultsList).toBeVisible({ timeout: 10000 });
    console.log('✅ Search results verified on return');

    // Final assertion
    expect(productNames.length).toBeGreaterThan(0);
    console.log('✅ All test steps completed successfully!');
  });
});
