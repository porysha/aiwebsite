from PIL import Image, ImageDraw, ImageFilter
import random, math
W,H=1200,630
LIME,CORAL,LILAC,SKY,AMB=(212,255,58),(255,90,54),(167,139,250),(76,201,240),(255,196,60)
PAL={'photo':[LIME,CORAL,LILAC],'video':[SKY,CORAL,LILAC],'audio':[CORAL,AMB,LILAC],'edu':[LIME,SKY,AMB],'chat':[LILAC,SKY,LIME]}
M={'edit-photo-with-ai-telegram':('photo','frame'),'enhance-photo-quality-free':('photo','spark'),'remove-background-free':('photo','cut'),
'solve-exam-questions-ai':('edu','paper'),'teacher-exam-question-generator':('edu','paper'),'ai-for-university-students':('edu','paper'),
'ai-music-generator-telegram':('audio','bars'),'ai-voice-changer-singer':('audio','rings'),'text-to-video-ai-free':('video','play'),
'photo-to-video-ai':('video','play'),'enhance-video-quality-ai':('video','spark'),'free-chatgpt-persian-telegram':('chat','chat'),'best-ai-telegram-bot-iran':('chat','spark')}
def bg(cat,seed):
    r=random.Random(seed); im=Image.new('RGB',(W,H),(9,9,14)); d=ImageDraw.Draw(im)
    for c in PAL[cat]*2:
        x,y,s=r.randint(0,W),r.randint(0,H),r.randint(180,320); d.ellipse([x-s,y-s,x+s,y+s],fill=c)
    im=im.filter(ImageFilter.GaussianBlur(130))
    dark=Image.new('RGB',(W,H),(9,9,14)); return Image.blend(im,dark,.35)
def glyph(im,kind):
    S=2; L=Image.new('RGBA',(W*S,H*S),(0,0,0,0)); d=ImageDraw.Draw(L); cx,cy=W*S//2,H*S//2
    def rr(b,r,f=None,o=None,w=0): d.rounded_rectangle(b,r,fill=f,outline=o,width=w)
    rr([cx-300*S//1,cy-200*S,cx+300*S,cy+200*S],60*S,(255,255,255,38),(255,255,255,110),3*S)
    wt=(255,255,255,235); dk=(9,9,14,255)
    if kind=='frame':
        rr([cx-220*S,cy-140*S,cx+220*S,cy+140*S],30*S,None,wt,8*S); d.ellipse([cx+80*S,cy-100*S,cx+150*S,cy-30*S],fill=LIME+(255,))
        d.polygon([(cx-200*S,cy+120*S),(cx-80*S,cy-20*S),(cx+20*S,cy+120*S)],fill=wt); d.polygon([(cx-20*S,cy+120*S),(cx+80*S,cy+20*S),(cx+200*S,cy+120*S)],fill=CORAL+(255,))
    elif kind=='spark':
        def star(x,y,R,c): d.polygon([(x,y-R),(x+R*.22,y-R*.22),(x+R,y),(x+R*.22,y+R*.22),(x,y+R),(x-R*.22,y+R*.22),(x-R,y),(x-R*.22,y-R*.22)],fill=c)
        star(cx,cy,150*S,wt); star(cx+190*S,cy-110*S,60*S,LIME+(255,)); star(cx-200*S,cy+100*S,45*S,CORAL+(255,))
    elif kind=='cut':
        q=40*S
        for i in range(-5,6):
            for j in range(-4,5):
                if (i+j)%2==0: d.rectangle([cx+i*q-q//2,cy+j*q-q//2,cx+i*q+q//2,cy+j*q+q//2],fill=(255,255,255,70))
        d.ellipse([cx-130*S,cy-130*S,cx+130*S,cy+130*S],fill=CORAL+(255,),outline=wt,width=10*S)
    elif kind=='paper':
        rr([cx-150*S,cy-170*S,cx+150*S,cy+170*S],26*S,wt)
        for k in range(4): rr([cx-110*S,cy-110*S+k*52*S,cx+(60 if k%2 else 110)*S,cy-90*S+k*52*S],10*S,dk)
        d.ellipse([cx+80*S,cy+60*S,cx+190*S,cy+170*S],fill=LIME+(255,)); d.line([(cx+105*S,cy+118*S),(cx+130*S,cy+142*S),(cx+170*S,cy+92*S)],fill=dk,width=12*S)
    elif kind=='bars':
        hs=[60,120,200,140,260,170,90,220,130,70]
        for i,h in enumerate(hs): x=cx-225*S+i*50*S; rr([x,cy-h*S//2,x+30*S,cy+h*S//2],15*S,[LIME,CORAL,wt][i%3] if i%3 else wt)
    elif kind=='rings':
        for k,R in enumerate([60,110,160,210]): d.ellipse([cx-R*S,cy-R*S,cx+R*S,cy+R*S],outline=[LIME+(255,),wt,CORAL+(255,),(255,255,255,120)][k],width=9*S)
    elif kind=='play':
        rr([cx-230*S,cy-140*S,cx+230*S,cy+140*S],40*S,dk); d.polygon([(cx-50*S,cy-80*S),(cx-50*S,cy+80*S),(cx+90*S,cy)],fill=LIME+(255,))
        rr([cx-200*S,cy+105*S,cx+120*S,cy+115*S],5*S,(255,255,255,120)); rr([cx-200*S,cy+105*S,cx-40*S,cy+115*S],5*S,CORAL+(255,))
    elif kind=='chat':
        rr([cx-250*S,cy-150*S,cx+80*S,cy-30*S],40*S,wt); rr([cx-80*S,cy+10*S,cx+250*S,cy+130*S],40*S,LIME+(255,))
        for i in range(3): d.ellipse([cx-200*S+i*50*S,cy-100*S,cx-170*S+i*50*S,cy-70*S],fill=dk)
        rr([cx-30*S,cy+55*S,cx+200*S,cy+75*S],10*S,dk)
    L=L.resize((W,H),Image.LANCZOS); im=im.convert('RGBA'); im.alpha_composite(L); return im.convert('RGB')
def grain(im):
    n=Image.effect_noise((W,H),40).convert('RGB'); return Image.blend(im,n,.06)
for i,(slug,(cat,g)) in enumerate(M.items()):
    grain(glyph(bg(cat,i*7+3),g)).save(f'public/img/{slug}.webp','WEBP',quality=78,method=6)
grain(glyph(bg('chat',99),'spark')).convert('RGB').save('public/og.jpg',quality=82)
# before/after
def scene(w,h,vivid):
    im=Image.new('RGB',(w,h)); d=ImageDraw.Draw(im)
    for y in range(h):
        t=y/h; c=(int(255*(.2+.8*t)),int(120+90*t),int(90+80*(1-t))) if vivid else (150,140,150)
        d.line([(0,y),(w,y)],fill=c)
    d.ellipse([w*.55,h*.2,w*.55+150,h*.2+150],fill=(255,240,160))
    for k,(base,col) in enumerate([(.62,(90,60,130)),(.72,(60,40,100)),(.85,(25,20,55))]):
        pts=[(0,h)]+[(x,h*base-60*math.sin(x/90+k*2)-40*math.sin(x/37+k)) for x in range(0,w+20,20)]+[(w,h)]
        d.polygon(pts,fill=col)
    return im
a=scene(600,750,True); a.save('public/img/after.webp',quality=82)
b=a.resize((60,75),Image.BILINEAR).resize((600,750),Image.BILINEAR).filter(ImageFilter.GaussianBlur(5))
b=Image.blend(b,Image.new('RGB',(600,750),(120,115,125)),.45); b=Image.blend(b,Image.effect_noise((600,750),60).convert('RGB'),.12); b.save('public/img/before.webp',quality=70)
