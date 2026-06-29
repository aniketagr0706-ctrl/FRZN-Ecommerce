import os
import glob
from PIL import Image

def downscale_frames():
    frames_dir = 'assets/frames'
    files = sorted(glob.glob(os.path.join(frames_dir, '*.webp')))
    
    print(f"Found {len(files)} frames. Downscaling to original 1280x720...")
    
    for idx, filepath in enumerate(files):
        try:
            img = Image.open(filepath)
            if img.size != (1280, 720):
                downscaled = img.resize((1280, 720), Image.LANCZOS)
                downscaled.save(filepath, 'WEBP', quality=90)
        except Exception as e:
            print(f"Error on {filepath}: {e}")
            
        if (idx + 1) % 50 == 0:
            print(f"Processed {idx + 1}/{len(files)} frames...")
            
    print("Done. All frames are now 1280x720.")

if __name__ == '__main__':
    downscale_frames()
