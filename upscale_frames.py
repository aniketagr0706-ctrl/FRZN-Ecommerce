import os
import glob
from PIL import Image, ImageFilter

def upscale_frames():
    input_dir = 'assets/frames'
    output_dir = 'assets/frames_2k'
    os.makedirs(output_dir, exist_ok=True)
    
    files = sorted(glob.glob(os.path.join(input_dir, '*.webp')))
    
    print(f"Found {len(files)} frames. Upscaling to 2K (2560x1440)...")
    
    for idx, filepath in enumerate(files):
        out_name = os.path.basename(filepath)
        out_path = os.path.join(output_dir, out_name)
        
        # Skip if already upscaled
        if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
            continue
            
        try:
            img = Image.open(filepath)
            # Upscale using Lanczos (high quality)
            upscaled = img.resize((2560, 1440), Image.LANCZOS)
            # Apply slight unsharp mask to recover sharpness lost during upscale
            sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
            
            sharpened.save(out_path, 'WEBP', quality=95)
        except Exception as e:
            print(f"Error on {filepath}: {e}")
            
        if (idx + 1) % 10 == 0:
            print(f"Upscaled {idx + 1}/{len(files)} frames...")
            
    print("Done upscaling all frames. Moving frames_2k to frames...")
    
    # Overwrite the old frames
    for filepath in glob.glob(os.path.join(output_dir, '*.webp')):
        basename = os.path.basename(filepath)
        target = os.path.join(input_dir, basename)
        os.replace(filepath, target)
        
    os.rmdir(output_dir)
    print("Successfully upgraded animation to 2K!")

if __name__ == '__main__':
    upscale_frames()
