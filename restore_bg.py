import os
import glob
from PIL import Image

def restore_last_frames(start_frame=250):
    input_dir = 'ezgif-868d775aba7b6482-jpg'
    output_dir = 'assets/frames'
    
    files = sorted(glob.glob(os.path.join(input_dir, '*.jpg')))
    
    print(f"Restoring background for frames from {start_frame} to {len(files)-1}...")
    
    for idx, filepath in enumerate(files):
        if idx >= start_frame:
            out_name = f"frame_{idx:04d}.webp"
            out_path = os.path.join(output_dir, out_name)
            
            try:
                img = Image.open(filepath)
                # Save without background removal
                img.save(out_path, 'WEBP', quality=90)
            except Exception as e:
                print(f"Error on {filepath}: {e}")
                
    print("Done restoring backgrounds.")

if __name__ == '__main__':
    restore_last_frames(250)
