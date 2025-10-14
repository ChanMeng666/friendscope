import html2canvas from 'html2canvas';

/**
 * Generate and download a share card image
 */
export const generateShareCard = async (elementId: string, filename: string): Promise<boolean> => {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Element not found:', elementId);
            return false;
        }

        // Generate canvas with high quality
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2, // Higher quality
            logging: false,
            useCORS: true,
            allowTaint: true
        });

        // Convert to blob and download
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${filename}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        }, 'image/png');

        return true;
    } catch (error) {
        console.error('Error generating share card:', error);
        return false;
    }
};

/**
 * Copy share card to clipboard
 */
export const copyShareCardToClipboard = async (elementId: string): Promise<boolean> => {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Element not found:', elementId);
            return false;
        }

        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
        });

        // Convert canvas to blob and copy to clipboard
        return new Promise((resolve) => {
            canvas.toBlob(async (blob) => {
                if (blob && navigator.clipboard && window.ClipboardItem) {
                    try {
                        await navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': blob })
                        ]);
                        resolve(true);
                    } catch (error) {
                        console.error('Error copying to clipboard:', error);
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            }, 'image/png');
        });
    } catch (error) {
        console.error('Error copying share card:', error);
        return false;
    }
};
