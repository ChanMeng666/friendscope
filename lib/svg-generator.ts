const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://friendscope.chanmeng-dev.workers.dev'

export const generateResultSVG = (
    friendName: string,
    overallScore: number,
    categoryScores: Record<string, number>
) => {
    const width = 800;
    const height = 800; // Increased height to accommodate website info

    const categoryScoresHTML = Object.entries(categoryScores)
        .map(([category, score], index) =>
            `<text x="50" y="${310 + index * 30}" font-size="14" fill="#64748b">${escapeXml(category)}: ${Math.round(score)}%</text>`
        ).join('');

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Gradient Background -->
        <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#f0f9ff;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#e0f2fe;stop-opacity:1" />
            </linearGradient>
            
            <!-- Decoration Gradients -->
            <linearGradient id="decorGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.2" />
                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
            </linearGradient>
        </defs>

        <!-- Background -->
        <rect width="100%" height="100%" fill="url(#bgGradient)" />

        <!-- Decorative Elements -->
        <circle cx="100" cy="100" r="50" fill="url(#decorGradient1)" />
        <circle cx="700" cy="500" r="70" fill="url(#decorGradient1)" />
        <path d="M600,50 L700,100 L600,150 Z" fill="url(#decorGradient1)" />

        <!-- Title -->
        <text x="400" y="80" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e3a8a">
            FriendScope Assessment Result
        </text>

        <!-- Friend Name -->
        <text x="400" y="120" text-anchor="middle" font-size="20" fill="#3b82f6">
            ${escapeXml(friendName)}
        </text>

        <!-- Overall Score -->
        <text x="400" y="180" text-anchor="middle" font-size="36" font-weight="bold" fill="#3b82f6">
            ${Math.round(overallScore)}%
        </text>
        <text x="400" y="210" text-anchor="middle" font-size="16" fill="#64748b">
            Overall Score
        </text>

        <!-- Category Scores -->
        <text x="50" y="270" font-size="16" font-weight="bold" fill="#1e3a8a">Category Scores:</text>
        ${categoryScoresHTML}

        <!-- Website Info -->
        <g transform="translate(0, ${height - 100})">
            <rect x="0" y="0" width="${width}" height="100" fill="#f8fafc" />
            <text x="${width/2}" y="40" text-anchor="middle" font-size="16" fill="#64748b">
                Visit us at FriendScope - Evaluate Your Friendships
            </text>
            <text x="${width/2}" y="70" text-anchor="middle" font-size="14" fill="#3b82f6">
                ${siteUrl}
            </text>
        </g>
    </svg>`;

    return svg;
};


export const downloadSVG = (svg: string, friendName: string) => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FriendScope-${friendName}-Result.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
