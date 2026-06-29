import os
import glob
from PIL import Image

def process_frames():
    input_dir = 'ezgif-868d775aba7b6482-jpg'
    output_dir = 'assets/frames'
    os.makedirs(output_dir, exist_ok=True)
    
    # Get all jpgs and sort them to maintain order
    files = sorted(glob.glob(os.path.join(input_dir, '*.jpg')))
    
    print(f"Found {len(files)} frames. Processing...")
    
    for idx, filepath in enumerate(files):
        img = Image.open(filepath)
        img = img.convert("RGBA")
        
        # Get data
        data = img.getdata()
        new_data = []
        
        # Tolerance for white background
        tolerance = 240
        for item in data:
            # item is (R, G, B, A)
            if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
                # Change all near-white pixels to transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        
        # Save as webp
        # Format index as 4 digits
        out_name = f"frame_{idx:04d}.webp"
        out_path = os.path.join(output_dir, out_name)
        
        # Save with lossless or high quality to retain jacket details
        img.save(out_path, 'WEBP', quality=90)
        
        if (idx + 1) % 50 == 0:
            print(f"Processed {idx + 1}/{len(files)} frames...")
            
    print("Done processing all frames.")

if __name__ == '__main__':
    process_frames()
