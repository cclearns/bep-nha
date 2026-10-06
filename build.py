#!/usr/bin/env python3
"""Build index.html: đọc src/ingredients.txt + src/recipes/*.txt + src/families.py,
tính calo / đạm / thẻ dinh dưỡng, rồi nhúng dữ liệu vào một file HTML tĩnh."""
import json, re, sys, unicodedata, glob, os

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')


def slug(s):
    s = unicodedata.normalize('NFD', s.replace('đ', 'd').replace('Đ', 'D'))
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


# ---------- nguyên liệu ----------
ING = {}
for line in open(os.path.join(SRC, 'ingredients.txt'), encoding='utf-8'):
    line = line.rstrip('\n')
    if not line or line.startswith('#'):
        continue
    p = line.split('|')
    assert len(p) == 9, line
    i, name, aisle, unit, gpu, kcal, prot, tags, pantry = p
    ING[i] = dict(id=i, n=name, a=aisle, u=unit, g=float(gpu), k=float(kcal), p=float(prot),
                  t=[t for t in tags.split(',') if t], pan=int(pantry))

# ---------- công thức ----------
sys.path.insert(0, SRC)
import families  # noqa

lines = []
for f in sorted(glob.glob(os.path.join(SRC, 'recipes', '*.txt'))):
    for line in open(f, encoding='utf-8'):
        line = line.rstrip('\n')
        if line and not line.startswith('#'):
            lines.append((os.path.basename(f), line))
for line in families.all_lines():
    lines.append(('families', line))

GROUPS = {'heo', 'ga', 'vit', 'bo', 'ca', 'haisan', 'trung', 'dauhu', 'rau', 'canh', 'nuoc'}
METHODS = {'kho', 'xao', 'chien', 'hap', 'nuong', 'ham', 'tron', 'canh', 'nuoc', 'com'}
ROLES = {'man', 'rau', 'canh', 'bat', 'kem'}
STRONG_FE = {'bo_thit', 'bo_nam', 'trau', 'ngan', 'hau', 'ngao', 'so', 'trung_vit_lon', 'rau_dien', 'rau_ngot',
             'rau_day', 'moc_nhi', 'luoi_lon', 'ca_moi', 'dau_xanh', 'rong_bien', 'cua_dong'}
WARM_ING = {'gung', 'sa', 'nghe', 'rieng', 'bot_nghe', 'ngu_vi_huong', 'bot_ca_ri', 'he', 'toi_tay', 'ngai_cuu'}
COOL_ING = {'bi_dao', 'bi_xanh', 'bau', 'muop', 'muop_dang', 'mong_toi', 'rau_day', 'rau_muong', 'cua_dong', 'dua_leo',
            'gia', 'rau_nhut', 'can_nuoc', 'can_tay', 'hoa_thien_ly', 'rau_ngot', 'cu_cai'}
MG_ING = {'rau_dien', 'mong_toi', 'cai_ngot', 'cai_xanh', 'bong_cai', 'dau_phu', 'dau_hu_non', 'dau_bap', 'mang_tay',
          'dau_phong', 'me_rang', 'rong_bien', 'dau_xanh', 'bi_do', 'ca_thu', 'ca_moi', 'ca_nuc', 'ca_bac_ma'}
B6_ING = {'ga_dui', 'ga_canh', 'ga_nguyen', 'ga_uc', 'ca_thu', 'khoai_tay', 'khoai_lang', 'bi_do', 'nam_bao_ngu',
          'mi_can', 'ca_basa', 'ca_ro_phi', 'bo_thit'}
OM_ING = {'ca_nuc', 'ca_bac_ma', 'ca_com', 'ca_thu', 'ca_moi', 'ca_cam'}
CARB_COMFORT = {'khoai_tay', 'khoai_lang', 'khoai_so', 'khoai_mo', 'bi_do', 'gao', 'com_chin', 'gao_nep', 'ngo_ngot'}
VEG_ING = {k for k, v in ING.items() if 'v' in v['t']}

PORK = {'ba_chi','nac_vai','nac_dam','thit_bam','suon_non','chan_gio','duoi_lon','tai_lon','long_lon','luoi_lon','mui_lon','dai_lon','xuc_xich','xuong_heo'}
BEEF = {'bo_thit','bo_nam','bo_gan','trau'}
recipes, seen = [], set()
errors = []
for src, line in lines:
    p = line.split('|')
    if len(p) != 11:
        errors.append(f'{src}: sai số cột ({len(p)}): {line[:60]}')
        continue
    name, grp, method, role, mins, diff, sv, ing, steps, tip, sub = [x.strip() for x in p]
    if grp not in GROUPS: errors.append(f'{name}: nhóm {grp}')
    if method not in METHODS: errors.append(f'{name}: cách {method}')
    if role not in ROLES: errors.append(f'{name}: vai {role}')
    rid = slug(name)
    if rid in seen:
        errors.append(f'trùng món: {name}')
        continue
    seen.add(rid)
    items, kcal, prot, tags, names = [], 0.0, 0.0, set(), []
    for tok in ing.split():
        try:
            iid, q = tok.split(':')
            q = float(q)
        except ValueError:
            errors.append(f'{name}: nguyên liệu lỗi "{tok}"'); continue
        if iid not in ING:
            errors.append(f'{name}: không có nguyên liệu "{iid}"'); continue
        d = ING[iid]
        grams = q * d['g']
        kcal += grams * d['k'] / 100
        prot += grams * d['p'] / 100
        tags.update(d['t'])
        items.append([iid, q])
    sv = float(sv)
    st = [s.strip() for s in steps.split(';') if s.strip()]
    ids = {i for i, _ in items}
    ps = round(kcal / sv)
    pp = round(prot / sv)

    # ----- đặc điểm dinh dưỡng -----
    strong = [i for i in ids if i in STRONG_FE]
    weak_fe = [i for i in ids if 'fe' in ING[i]['t'] and i not in STRONG_FE]
    warm = [i for i in ids if i in WARM_ING]
    cool = [i for i in ids if i in COOL_ING]
    mg = [i for i in ids if i in MG_ING]
    b6 = [i for i in ids if i in B6_ING]
    om = [i for i in ids if i in OM_ING]
    comfort = [i for i in ids if i in CARB_COMFORT]
    vegn = len([i for i in ids if i in VEG_ING])
    salty = 'sa' in tags and (any(i in ids for i in ('nuoc_mam', 'tom_kho', 'dua_chua', 'kim_chi', 'mam_tom', 'tuong_den', 'xuc_xich', 'mi_an_lien', 'gia_vi_lau_thai')))
    hot = 'hot' in tags
    fried = method == 'chien'
    raw_cold = method == 'tron'
    soupy = method in ('canh', 'ham', 'nuoc')
    light = ps <= 320 and method in ('hap', 'canh', 'tron', 'xao') and not fried

    def nm(lst, k=2):
        return ', '.join(ING[i]['n'].lower() for i in lst[:k])

    ph = {}
    sc, why = 0, []
    if strong: sc += 3; why.append('giàu sắt (' + nm(strong) + ')')
    elif weak_fe: sc += 1; why.append('có sắt thực vật (' + nm(weak_fe) + ')')
    if warm: sc += 2; why.append('tính ấm (' + nm(warm) + ')')
    if soupy or method == 'kho': sc += 1; why.append('món nóng, ấm bụng')
    if cool: sc -= 2
    if raw_cold: sc -= 3
    if hot: sc -= 1
    if fried: sc -= 1
    if sc >= 3: ph['menstrual'] = why
    sc, why = 0, []
    if pp >= 14: sc += 2; why.append(f'đạm tốt (~{pp} g/phần)')
    if strong or weak_fe: sc += 2; why.append('bổ sung sắt sau hành kinh')
    if vegn >= 2: sc += 1; why.append('nhiều rau củ')
    if light: sc += 1
    if sc >= 3: ph['follicular'] = why
    sc, why = 0, []
    if vegn >= 2 or raw_cold: sc += 2; why.append('nhiều rau, xơ, nhẹ bụng')
    if om: sc += 2; why.append('omega-3 từ cá (' + nm(om, 1) + ')')
    if light: sc += 2; why.append('thanh nhẹ')
    if 'e' in tags: sc += 1
    if fried: sc -= 2
    if sc >= 4: ph['ovulation'] = why
    sc, why = 0, []
    if mg: sc += 3; why.append('giàu magie (' + nm(mg) + ') giúp dịu cơ thể')
    if b6: sc += 2; why.append('vitamin B6 (' + nm(b6, 1) + ')')
    if comfort: sc += 2; why.append('tinh bột tốt, no lâu (' + nm(comfort, 1) + ')')
    if salty: sc -= 2
    if fried: sc -= 2
    if hot: sc -= 1
    if sc >= 3: ph['luteal'] = why

    mood = []
    if pp >= 15 or strong: mood.append('met_moi')
    if (mg or b6 or soupy) and not fried: mood.append('cang_thang')
    if (method in ('ham', 'canh', 'nuoc') or (method == 'kho' and warm) or 'cháo' in name.lower()) and not raw_cold: mood.append('am_bung')
    if (name.lower().startswith('cháo') or method in ('canh', 'hap') or role == 'rau') and not salty and not hot and not fried: mood.append('nhat_mieng')
    if int(mins) <= 20 and int(diff) == 1: mood.append('luoi')
    if fried or method == 'nuong' or ps >= 450 or role == 'bat' and mins and int(mins) >= 30: mood.append('thich')
    if cool or raw_cold or method in ('canh', 'hap') and not warm: mood.append('nong')
    if grp == 'nuoc' or role == 'bat': mood.append('doi_vi')

    meals = ['trua', 'toi']
    if role == 'bat' or grp == 'nuoc':
        meals = ['sang', 'trua', 'toi'] if ps <= 600 else ['trua', 'toi']
    if grp == 'trung' and method in ('chien', 'hap') and role == 'man' and int(mins) <= 20:
        meals = ['sang', 'trua', 'toi']

    aisles = sorted({ING[i]['a'] for i in ids})
    recipes.append(dict(
        id=rid, n=name, g=grp, m=method, r=role, t=int(mins), d=int(diff), sv=sv, i=items, s=st,
        tip=tip, sub=sub, k=ps, p=pp, tg=sorted((tags & {'m', 's', 'sh', 'e', 'f', 'n'}) | ({'pk'} if ids & PORK else set()) | ({'bf'} if ids & BEEF else set())),
        chay=not (tags & {'m', 's', 'f'}), ph=ph, mo=mood, ml=meals,
        feat=dict(fe=bool(strong), warm=bool(warm), cool=bool(cool), mg=bool(mg), om=bool(om), hot=hot, salty=bool(salty), fried=fried, veg=vegn >= 2),
    ))

if errors:
    print('\n'.join(errors))
    sys.exit(1)

# ---------- xuất ----------
ing_out = {k: dict(n=v['n'], a=v['a'], u=v['u'], g=v['g'], k=v['k'], p=v['p'], pan=v['pan']) for k, v in ING.items()}
data = dict(ing=ing_out, rec=recipes)
blob = json.dumps(data, ensure_ascii=False, separators=(',', ':'))

tpl = open(os.path.join(SRC, 'template.html'), encoding='utf-8').read()
css = open(os.path.join(SRC, 'style.css'), encoding='utf-8').read()
js = open(os.path.join(SRC, 'app.js'), encoding='utf-8').read()
html = tpl.replace('/*CSS*/', css).replace('/*JS*/', js).replace('/*DATA*/', 'const DATA=' + blob + ';')
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)

from collections import Counter
print(f'OK: {len(recipes)} món, {len(ING)} nguyên liệu, index.html {len(html)//1024} KB')
print(Counter(r['g'] for r in recipes))
unused = set(ING) - {i for r in recipes for i, _ in r['i']}
print('nguyên liệu chưa dùng:', sorted(unused))
for ph_ in ('menstrual', 'follicular', 'ovulation', 'luteal'):
    print(ph_, sum(1 for r in recipes if ph_ in r['ph']))
print('chay', sum(1 for r in recipes if r['chay']))
