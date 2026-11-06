"""Generate small, portable PNG icons for H5 and WeChat from vector strokes."""
from pathlib import Path
from PIL import Image, ImageDraw
import math

ROOT = Path(__file__).resolve().parents[1] / 'src/static/icons'
ROOT.mkdir(parents=True, exist_ok=True)
SCALE = 4

def make(name, color):
    image = Image.new('RGBA', (24 * SCALE, 24 * SCALE))
    draw = ImageDraw.Draw(image)
    def line(points, width=1.5):
        draw.line([(round(x*SCALE), round(y*SCALE)) for x,y in points], fill=color, width=round(width*SCALE))
        radius = width*SCALE/2
        for x,y in (points[0], points[-1]):
            draw.ellipse((x*SCALE-radius,y*SCALE-radius,x*SCALE+radius,y*SCALE+radius), fill=color)
    def ellipse(box, width=1.5):
        x1,y1,x2,y2 = [round(n*SCALE) for n in box]
        for inset in range(round(width*SCALE)):
            draw.ellipse((x1+inset,y1+inset,x2-inset,y2-inset), outline=color)
    def rect(box, radius=2, width=1.5):
        x1,y1,x2,y2 = box
        line([(x1,y1),(x2,y1),(x2,y2),(x1,y2),(x1,y1)],width)
    def arc(box, start, end):
        x1,y1,x2,y2 = [round(n*SCALE) for n in box]
        for inset in range(6): draw.arc((x1+inset,y1+inset,x2-inset,y2-inset), start, end, fill=color)
    if name == 'heart':
        points = []
        for i in range(121):
            t = i*2*math.pi/120
            points.append((12+math.sin(t)**3*9, 11-(13*math.cos(t)-5*math.cos(2*t)-2*math.cos(3*t)-math.cos(4*t))*.57))
        line(points,1.6)
    elif name == 'compass':
        ellipse((3,3,21,21));line([(15.8,8.2),(13.4,13.4),(8.2,15.8),(10.6,10.6),(15.8,8.2)])
    elif name == 'bookmark': line([(6,21),(6,4),(7,3),(17,3),(18,4),(18,21),(12,17),(6,21)])
    elif name == 'user': ellipse((8,3,16,11));arc((4,13,20,29),180,360)
    elif name == 'shield': line([(12,2.5),(20,6),(19,14),(16,18.5),(12,21),(8,18.5),(5,14),(4,6),(12,2.5)]);line([(8.5,11.5),(11,14),(15.5,9.5)])
    elif name == 'arrow-up-right': line([(6,18),(18,6)]);line([(7,6),(18,6),(18,17)])
    elif name == 'arrow-right': line([(4,12),(20,12)]);line([(14,6),(20,12),(14,18)])
    elif name == 'chevron-right': line([(9,5),(16,12),(9,19)])
    elif name == 'chevron-down': line([(6,9),(12,15),(18,9)])
    elif name == 'bell': arc((6,3,18,15),180,360);line([(6,9),(6,15),(3.5,18),(20.5,18),(18,15),(18,9)]);arc((9,17,15,22),0,180);line([(12,2),(12,3)])
    elif name == 'plus': line([(12,5),(12,19)]);line([(5,12),(19,12)])
    elif name == 'sparkles':
        line([(13,2),(15.5,8.5),(22,11),(15.5,13.5),(13,20),(10.5,13.5),(4,11),(10.5,8.5),(13,2)])
        line([(5,2),(5,6)]);line([(3,4),(7,4)]);line([(4,17),(4,21)]);line([(2,19),(6,19)])
    elif name == 'coffee':
        line([(4,8),(17,8),(17,17),(15,20),(6,20),(4,17),(4,8)]);arc((14,8,22,15),260,100);line([(7,5),(7,2)]);line([(12,5),(12,2)])
    elif name == 'home': line([(2,11),(12,3),(22,11)]);line([(5,9),(5,21),(19,21),(19,9)]);line([(9,21),(9,14),(15,14),(15,21)])
    elif name == 'medical':
        rect((3,6,21,21));line([(8,6),(8,3),(16,3),(16,6)]);line([(12,10),(12,17)]);line([(8.5,13.5),(15.5,13.5)])
    elif name == 'book':
        line([(12,21),(12,5),(8,3),(2,3),(2,19),(8,19),(12,21),(16,19),(22,19),(22,3),(16,3),(12,5)])
    elif name == 'sliders':
        line([(6,3),(6,8)]);line([(6,12),(6,21)]);ellipse((4,8,8,12));line([(12,3),(12,15)]);line([(12,19),(12,21)]);ellipse((10,15,14,19));line([(18,3),(18,6)]);line([(18,10),(18,21)]);ellipse((16,6,20,10))
    elif name == 'close': line([(6,6),(18,18)],1.8);line([(18,6),(6,18)],1.8)
    elif name == 'undo': arc((4,5,21,21),210,490);line([(3,4),(3,11),(10,11)])
    elif name == 'pin':
        points=[(12+7*math.cos(math.radians(a)),9+7*math.sin(math.radians(a))) for a in range(150,391,4)]
        line([(6,12),(12,22),(18,12)]);line(points);ellipse((9.5,6.5,14.5,11.5))
    elif name == 'badge':
        pts=[(12+(9 if i%2==0 else 7.6)*math.cos(i*math.pi/10-math.pi/2),12+(9 if i%2==0 else 7.6)*math.sin(i*math.pi/10-math.pi/2)) for i in range(21)]
        line(pts);line([(8,12),(11,15),(16,9)])
    elif name == 'receipt':
        line([(5,22),(5,3),(8,5),(10,3),(12,5),(14,3),(16,5),(19,3),(19,22),(16,20),(14,22),(12,20),(10,22),(8,20),(5,22)]);line([(9,9),(15,9)]);line([(9,13),(15,13)]);line([(9,17),(13,17)])
    elif name == 'sun':
        ellipse((7,7,17,17))
        for i in range(8):
            a=i*math.pi/4;line([(12+8*math.cos(a),12+8*math.sin(a)),(12+10.5*math.cos(a),12+10.5*math.sin(a))])
    elif name == 'swipe':
        line([(8,15),(8,7),(9,5),(11,5),(12,7),(12,12),(15,11),(18,12),(19,15),(17,22),(10,22),(5,17),(5,15),(7,14),(10,17)]);line([(3,7),(3,3),(7,3)]);line([(18,3),(22,3),(22,7)])
    elif name == 'check': line([(5,12),(10,17),(20,6)],2)
    return image

names = ['heart','compass','bookmark','user','shield','arrow-up-right','arrow-right','chevron-right','chevron-down','bell','plus','sparkles','coffee','home','medical','book','sliders','close','undo','pin','badge','receipt','sun','swipe','check']
for name in names:
    for suffix, color in [('', '#929b83'), ('-orange', '#d47c56'), ('-white', '#ffffff')]:
        make(name, color).save(ROOT / f'{name}{suffix}.png')
print(f'Generated {len(names)*3} icons')
