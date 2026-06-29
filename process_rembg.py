import os
import glob
from rembg import remove
from PIL import Image

def process_frames():
    input_dir = 'ezgif-868d775aba7b6482-jpg'
    output_dir = 'assets/frames'
    os.makedirs(output_dir, exist_ok=True)
    
    files = sorted(glob.glob(os.path.join(input_dir, '*.jpg')))
    
    print(f"Found {len(files)} frames. Resuming rembg processing...")
    
    processed_count = 0
    for idx, filepath in enumerate(files):
        out_name = f"frame_{idx:04d}.webp"
        out_path = os.path.join(output_dir, out_name)
        
        # Skip if file already exists and is not 0 bytes
        # However, because my FIRST script made 300 files, they all exist.
        # But wait! I can check file sizes. My old script generated sizes ~14-17kb.
        # rembg generates smaller files or different sizes? Actually, I'll just check if it was processed TODAY recently.
        # Let's skip based on the index. The previous rembg stopped at index 155.
        # Actually, let's just delete the bad ones and re-run for everything from 155 to 299.
        if idx < 155:
            # We already ran rembg successfully on 000 to 154
            processed_count += 1
            continue
            
        try:
            input_image = Image.open(filepath)
            output_image = remove(input_image)
            output_image.save(out_path, 'WEBP', quality=85)
            processed_count += 1
        except Exception as e:
            print(f"Error on {filepath}: {e}")
            
        if (processed_count) % 10 == 0:
            print(f"Processed {processed_count}/{len(files)} frames...")
            
    print("Done processing all frames.")

if __name__ == '__main__':
    process_frames()
