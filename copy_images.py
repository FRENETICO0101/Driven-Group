import shutil
import os

images = {
    r"C:\Users\TheFuckingMachine\.gemini\antigravity\brain\3a817a19-d461-4d53-9d68-91daf611dde1\liderazgo_chess_1773547240308.png": r"c:\Users\TheFuckingMachine\Desktop\Takashi - Babel Solutions\source\public\images\liderazgo.png",
    r"C:\Users\TheFuckingMachine\.gemini\antigravity\brain\3a817a19-d461-4d53-9d68-91daf611dde1\finanzas_dashboard_1773547276996.png": r"c:\Users\TheFuckingMachine\Desktop\Takashi - Babel Solutions\source\public\images\finanzas.png",
    r"C:\Users\TheFuckingMachine\.gemini\antigravity\brain\3a817a19-d461-4d53-9d68-91daf611dde1\estrategico_compass_1773547320339.png": r"c:\Users\TheFuckingMachine\Desktop\Takashi - Babel Solutions\source\public\images\estrategico.png"
}

os.makedirs(r"c:\Users\TheFuckingMachine\Desktop\Takashi - Babel Solutions\source\public\images", exist_ok=True)

for src, dst in images.items():
    try:
        shutil.copy2(src, dst)
        print(f"Copied {src} to {dst}")
    except Exception as e:
        print(f"Failed to copy {src}: {e}")
