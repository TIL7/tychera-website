#!/usr/bin/env node

/**
 * Generate Open Graph Image for TYCHERA Website
 * 
 * Creates a professional 1200x630px OG image with:
 * - TYCHERA branding colors (Primary Blue #2283a2, Gold #E9C46A)
 * - Institutional design
 * - Logo and text
 * 
 * Usage: node scripts/generate-og-image.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const WIDTH = 1200;
const HEIGHT = 630;

// TYCHERA Design System Colors
const COLORS = {
  primaryBlue: '#2283a2',
  accentGreen: '#588157',
  gold: '#E9C46A',
  white: '#FFFFFF',
  darkGray: '#1a1a1a',
  lightGray: '#f5f5f5',
};

async function generateOGImage() {
  try {
    console.log('Generating: Generating Open Graph image...');

    // Create SVG for the OG image
    const svg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <!-- Background gradient -->
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${COLORS.primaryBlue};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${COLORS.primaryBlue};stop-opacity:0.95" />
          </linearGradient>
          
          <!-- Gold accent gradient -->
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${COLORS.gold};stop-opacity:0" />
            <stop offset="50%" style="stop-color:${COLORS.gold};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${COLORS.gold};stop-opacity:0" />
          </linearGradient>
        </defs>

        <!-- Main background -->
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGradient)"/>

        <!-- Decorative elements -->
        <!-- Top right accent -->
        <circle cx="${WIDTH - 100}" cy="50" r="80" fill="${COLORS.gold}" opacity="0.15"/>
        
        <!-- Bottom left accent -->
        <circle cx="80" cy="${HEIGHT - 60}" r="100" fill="${COLORS.gold}" opacity="0.1"/>

        <!-- Gold accent line -->
        <rect x="0" y="280" width="${WIDTH}" height="2" fill="url(#accentGradient)"/>

        <!-- Main content area -->
        <!-- Logo area (simplified - using text instead) -->
        <text x="60" y="120" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="${COLORS.gold}">
          TYCHERA
        </text>
        
        <text x="60" y="155" font-family="Georgia, serif" font-size="18" fill="${COLORS.white}" opacity="0.9">
          INVESTMENTS LTD
        </text>

        <!-- Main headline -->
        <text x="60" y="320" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="${COLORS.white}">
          Architect of Project
        </text>
        
        <text x="60" y="380" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="${COLORS.white}">
          Financing in Africa
        </text>

        <!-- Subtitle -->
        <text x="60" y="450" font-family="Arial, sans-serif" font-size="20" fill="${COLORS.white}" opacity="0.85">
          Strategic partnerships. Sustainable growth. Institutional excellence.
        </text>

        <!-- Bottom accent bar -->
        <rect x="0" y="${HEIGHT - 8}" width="${WIDTH}" height="8" fill="${COLORS.gold}"/>

        <!-- Website URL -->
        <text x="${WIDTH - 60}" y="${HEIGHT - 20}" font-family="Arial, sans-serif" font-size="14" fill="${COLORS.white}" opacity="0.7" text-anchor="end">
          tycherainvest.com
        </text>
      </svg>
    `;

    // Convert SVG to image
    const outputPath = path.join(process.cwd(), 'public', 'og-image.jpg');
    
    // Ensure public directory exists
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, progressive: true })
      .toFile(outputPath);

    console.log(`OK: OG image created successfully: ${outputPath}`);
    console.log(`   Dimensions: ${WIDTH}x${HEIGHT}px`);
    console.log(`   Format: JPEG (optimized)`);

    // Also create a PNG version for better quality
    const pngPath = path.join(process.cwd(), 'public', 'og-image.png');
    await sharp(Buffer.from(svg))
      .png({ quality: 90 })
      .toFile(pngPath);

    console.log(`OK: PNG version also created: ${pngPath}`);

  } catch (error) {
    console.error('Error: Error generating OG image:', error);
    process.exit(1);
  }
}

// Run the script
generateOGImage();
