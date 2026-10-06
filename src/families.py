# -*- coding: utf-8 -*-
"""Các nhóm món lặp mẫu; mỗi món vẫn có mẹo + thay thế riêng."""


def L(name, grp, method, role, mins, diff, sv, ing, steps, tip, sub):
    if isinstance(steps, (list, tuple)):
        steps = ';'.join(steps)
    return '|'.join(str(x) for x in (name, grp, method, role, mins, diff, sv, ing, steps, tip, sub))


# ---------------------------------------------------------------- rau xào tỏi
RAU_TOI = [
    ('Bí xanh xào tỏi', 'bi_xanh', 400, 'Bí xanh gọt vỏ, bỏ ruột, thái sợi hoặc lát mỏng', 5, 'Bí ra nước nhanh nên xào lửa lớn, không đậy vung', 'Dùng bí đao hoặc su su.'),
    ('Bông cải xanh xào tỏi', 'bong_cai', 350, 'Cắt bông cải thành cụm nhỏ, chần 1 phút trong nước sôi có chút muối rồi vớt ngâm nước lạnh', 3, 'Chần tối đa 1 phút để giữ màu xanh và độ giòn', 'Súp lơ trắng hoặc măng tây.'),
    ('Bắp cải xào tỏi', 'bap_cai', 400, 'Bắp cải thái miếng vừa ăn, tách phần cuống riêng', 4, 'Cho phần cuống vào trước 1 phút rồi mới cho lá', 'Cải thảo.'),
    ('Cải ngọt xào tỏi', 'cai_ngot', 300, 'Cải ngọt nhặt, rửa sạch, cắt khúc 5 cm', 3, 'Xào lửa lớn, không đảo quá lâu kẻo cải ra nước', 'Cải thìa, cải xanh.'),
    ('Cải thìa xào tỏi', 'cai_thia', 300, 'Cải thìa rửa sạch, bổ đôi hoặc tách bẹ', 3, 'Thêm 1 muỗng dầu hào cho đậm vị nếu thích', 'Cải ngọt, cải xanh.'),
    ('Cải xanh xào tỏi', 'cai_xanh', 300, 'Cải xanh rửa sạch, cắt khúc', 3, 'Cải già thì chần sơ 20 giây để bớt hăng', 'Cải ngọt.'),
    ('Cần nước xào tỏi', 'can_nuoc', 250, 'Cần nước nhặt, rửa sạch, cắt khúc 4 cm', 2, 'Chỉ xào khoảng 2 phút để cần giòn và giữ mùi thơm', 'Rau muống, cải ngọt.'),
    ('Mướp xào tỏi', 'muop', 400, 'Mướp gọt vỏ, cắt khúc xéo', 4, 'Cho mướp vào sau cùng, xào nhanh để không nhũn', 'Bầu, su su.'),
    ('Rau bầu xào tỏi', 'rau_bau', 250, 'Ngọn bầu nhặt bỏ cọng già, rửa sạch', 2, 'Rau bầu mềm, xào 2 phút là chín', 'Rau lang, rau muống.'),
    ('Rau dền xào tỏi', 'rau_dien', 300, 'Rau dền nhặt lá non, rửa sạch, để ráo', 3, 'Xào nhanh để nước rau không chuyển đỏ nhiều', 'Mồng tơi, rau lang.'),
    ('Rau lang xào tỏi', 'rau_lang', 300, 'Ngọn rau lang bẻ khúc, rửa sạch, để ráo', 3, 'Rau lang xào lửa lớn sẽ giòn và xanh', 'Rau muống.'),
    ('Rau nhút xào tỏi', 'rau_nhut', 250, 'Rau nhút rửa sạch, cắt khúc, để ráo', 2, 'Xào thật nhanh, chín tới là tắt bếp', 'Rau muống.'),
    ('Su su xào tỏi', 'su_su', 400, 'Su su gọt vỏ, bỏ lõi, thái sợi hoặc lát mỏng', 5, 'Ngâm su su vào nước muối loãng để không bị nhựa dính tay', 'Bí xanh, bầu.'),
    ('Đậu bắp xào tỏi', 'dau_bap', 300, 'Đậu bắp cắt bỏ cuống, thái lát chéo', 4, 'Xào lửa lớn, không đậy vung để đậu bắp không nhớt', 'Đậu cô ve.'),
    ('Đậu cô ve xào tỏi', 'dau_co_ve', 300, 'Đậu cô ve tuốt xơ, cắt khúc 4 cm', 5, 'Có thể chần 1 phút trước để đậu chín đều', 'Đậu que.'),
    ('Đậu que xào tỏi', 'dau_que', 300, 'Đậu que tuốt xơ, cắt khúc, chần 1 phút', 5, 'Thêm chút nước khi xào để đậu chín mềm', 'Đậu cô ve.'),
    ('Rau muống xào tỏi', 'rau_muong', 400, 'Rau muống nhặt, rửa sạch, ngắt khúc, để ráo hẳn', 2, 'Chảo thật nóng và xào nhanh tay để rau xanh giòn', 'Cải ngọt.'),
    ('Bí đỏ xào tỏi', 'bi_do', 400, 'Bí đỏ gọt vỏ, thái lát mỏng', 8, 'Cho thêm 3 muỗng canh nước, đậy vung 3 phút cho bí mềm rồi xào cạn nước', 'Khoai lang, su su.'),
    ('Măng tây xào tỏi', 'mang_tay', 250, 'Măng tây bẻ bỏ gốc già, cắt khúc 5 cm', 3, 'Xào lửa lớn 3 phút để măng tây còn giòn ngọt', 'Đậu cô ve.'),
]

# ---------------------------------------------------------- rau xào thịt băm / thịt
RAU_THIT = [
    ('Bí xanh xào thịt băm', 'bi_xanh', 350, 'thit_bam', 100, 'Bí xanh gọt vỏ, thái sợi', 5, 'Ướp thịt trước 10 phút sẽ ngấm vị hơn', 'Bí đao, su su.'),
    ('Bắp cải xào thịt băm', 'bap_cai', 350, 'thit_bam', 100, 'Bắp cải thái miếng vừa ăn', 4, 'Xào lửa lớn để bắp cải giữ độ giòn ngọt', 'Cải thảo.'),
    ('Bắp cải xào thịt', 'bap_cai', 350, 'nac_vai', 120, 'Bắp cải thái miếng, thịt nạc vai thái lát mỏng', 4, 'Ướp thịt với 1 muỗng nước tương và ít bột năng cho mềm', 'Thịt gà hoặc thịt bò.'),
    ('Cà tím xào thịt băm', 'ca_tim', 2.5, 'thit_bam', 100, 'Cà tím cắt khúc, ngâm nước muối loãng 5 phút cho khỏi thâm', 8, 'Chiên sơ cà tím trước để giữ màu tím đẹp, ít thấm dầu hơn nếu dùng chảo chống dính', 'Đậu phụ non cắt miếng.'),
    ('Dưa leo xào thịt', 'dua_leo', 350, 'nac_vai', 120, 'Dưa leo bổ đôi, bỏ ruột, thái lát dày; thịt thái mỏng', 4, 'Dưa leo chỉ xào 1-2 phút để giữ độ giòn', 'Bí xanh.'),
    ('Giá xào thịt băm', 'gia', 250, 'thit_bam', 100, 'Giá rửa sạch, để ráo; hẹ cắt khúc', 3, 'Chảo thật nóng và xào nhanh để giá không ra nước', 'Giá đỗ xanh hoặc rau muống.'),
    ('Mướp xào thịt băm', 'muop', 400, 'thit_bam', 100, 'Mướp gọt vỏ, cắt khúc xéo', 5, 'Xào thịt chín trước, cho mướp sau và đảo nhanh', 'Bầu, su su.'),
    ('Mướp đắng xào thịt băm', 'muop_dang', 300, 'thit_bam', 100, 'Mướp đắng bổ dọc, bỏ ruột, thái mỏng, bóp muối 5 phút rồi rửa lại cho bớt đắng', 6, 'Chần sơ 30 giây nếu muốn bớt đắng nhiều hơn', 'Su su nếu không ăn được đắng.'),
    ('Su su xào thịt băm', 'su_su', 400, 'thit_bam', 100, 'Su su gọt vỏ, thái sợi', 6, 'Nêm vừa tay vì su su ra nước làm nhạt vị', 'Bí xanh, bầu.'),
    ('Đậu bắp xào thịt', 'dau_bap', 300, 'nac_vai', 120, 'Đậu bắp thái lát chéo; thịt thái mỏng', 5, 'Xào lửa lớn, không đậy vung để đậu bắp không nhớt', 'Đậu cô ve.'),
    ('Đậu cô ve xào thịt băm', 'dau_co_ve', 300, 'thit_bam', 100, 'Đậu cô ve tuốt xơ, cắt khúc, chần 1 phút', 6, 'Thêm 3 muỗng canh nước rồi đậy vung 2 phút cho đậu mềm', 'Đậu que.'),
    ('Đậu que xào thịt băm', 'dau_que', 300, 'thit_bam', 100, 'Đậu que tuốt xơ, cắt khúc, chần 1 phút', 6, 'Đậu que phải chín kỹ mới ăn được, đừng xào quá nhanh', 'Đậu cô ve.'),
]

# ------------------------------------------------------------------ rau xào trứng
RAU_TRUNG = [
    ('Bầu xào trứng', 'bau', 400, 'Bầu gọt vỏ, thái sợi hoặc lát mỏng', 5, 'Đánh trứng với chút nước mắm, xào bầu mềm rồi mới đổ trứng vào', 'Mướp, su su.'),
    ('Bắp cải xào trứng', 'bap_cai', 350, 'Bắp cải thái miếng vừa ăn', 4, 'Đổ trứng khi bắp cải vừa mềm, để trứng hơi đông rồi mới đảo', 'Cải thảo.'),
    ('Cà chua xào trứng', 'ca_chua', 3, 'Cà chua bổ múi cau', 6, 'Xào cà chua đến khi ra nước sánh rồi mới cho trứng để nước xốt đậm đà', 'Cà chua bi.'),
    ('Dưa leo xào trứng', 'dua_leo', 300, 'Dưa leo bổ đôi, bỏ ruột, thái lát', 4, 'Xào dưa leo thật nhanh để giữ độ giòn', 'Bí xanh.'),
    ('Giá xào trứng', 'gia', 250, 'Giá rửa sạch, để ráo; hẹ cắt khúc', 3, 'Cho trứng sau, đảo nhanh rồi tắt bếp để giá còn giòn', 'Rau muống.'),
    ('Khổ qua xào trứng', 'muop_dang', 300, 'Khổ qua bổ dọc, bỏ ruột, thái mỏng, bóp muối 5 phút rồi rửa lại', 6, 'Đánh trứng với chút bột nêm; xào khổ qua gần chín mới đổ trứng', 'Mướp hương.'),
    ('Mướp xào trứng', 'muop', 400, 'Mướp gọt vỏ, cắt khúc xéo', 5, 'Mướp ra nước nên không cần thêm nước khi xào', 'Bầu, su su.'),
    ('Rau muống xào trứng', 'rau_muong', 300, 'Rau muống nhặt, ngắt khúc, để ráo', 3, 'Xào rau xong thì đẩy sang một bên và đổ trứng vào xào riêng', 'Cải ngọt.'),
    ('Su su xào trứng', 'su_su', 400, 'Su su gọt vỏ, thái sợi', 6, 'Xào su su gần chín rồi mới cho trứng', 'Bí xanh.'),
    ('Đậu bắp xào trứng', 'dau_bap', 300, 'Đậu bắp thái lát chéo', 5, 'Xào đậu bắp với lửa lớn trước, không đậy vung', 'Đậu cô ve.'),
]

# ----------------------------------------------------------- canh thịt băm
CANH_BAM = [
    ('Canh bắp cải thịt băm', 'bap_cai', 300, 'Bắp cải thái miếng vừa ăn', 8, 'Bắp cải chín nhanh, cho vào sau cùng để canh ngọt thanh', 'Cải thảo.'),
    ('Canh bầu thịt băm', 'bau', 400, 'Bầu gọt vỏ, thái miếng', 10, 'Nấu bầu vừa mềm là tắt bếp, nấu lâu bầu sẽ nát', 'Bí xanh.'),
    ('Canh bí xanh thịt băm', 'bi_xanh', 400, 'Bí xanh gọt vỏ, thái miếng', 10, 'Cho thêm vài lát gừng để canh ấm và bớt tanh thịt', 'Bí đao.'),
    ('Canh cải thịt băm', 'cai_xanh', 300, 'Cải xanh nhặt, rửa sạch, cắt khúc', 8, 'Cho rau vào khi nước sôi mạnh để rau giữ màu xanh', 'Cải ngọt.'),
    ('Canh rau cải thịt băm', 'cai_ngot', 300, 'Rau cải ngọt nhặt, rửa sạch, cắt khúc', 8, 'Không đậy vung khi nấu để rau không bị vàng', 'Cải thìa.'),
    ('Canh khoai mỡ thịt băm', 'khoai_mo', 300, 'Khoai mỡ gọt vỏ, thái miếng (đeo găng vì ngứa tay)', 20, 'Nghiền hoặc dùng muỗng ép bớt khoai để canh sánh mịn', 'Khoai sọ.'),
    ('Canh mướp thịt băm', 'muop', 400, 'Mướp gọt vỏ, thái khúc xéo', 10, 'Nấu mướp vừa chín tới, đừng để quá mềm nhũn', 'Bầu.'),
    ('Canh rau dền thịt băm', 'rau_dien', 300, 'Rau dền nhặt, rửa sạch', 8, 'Nấu nhanh vài phút để rau dền xanh và giữ vitamin', 'Mồng tơi.'),
    ('Canh rau ngót thịt băm', 'rau_ngot', 250, 'Rau ngót tuốt lá, rửa sạch (có thể vò nhẹ cho thơm)', 8, 'Rau ngót nấu vừa chín, không đậy vung để nước canh xanh', 'Rau dền, mồng tơi.'),
]

# ------------------------------------------------------------------ canh rau
CANH_RAU = [
    ('Canh bắp cải', 'bap_cai', 300, 'Bắp cải thái miếng', 8, 'Nấu bằng nước hầm xương cho ngọt tự nhiên', 'Cải thảo.', 'canh_tomkho'),
    ('Canh bầu', 'bau', 400, 'Bầu gọt vỏ, thái miếng', 8, 'Thêm ít tôm khô giã nhỏ cho đậm vị', 'Bí xanh.', 'canh_tomkho'),
    ('Canh bí đao', 'bi_dao', 400, 'Bí đao gọt vỏ, thái miếng', 10, 'Món thanh nhiệt, cho vài lát gừng để nước canh ấm hơn', 'Bầu.', 'canh_tomkho'),
    ('Canh cải ngọt', 'cai_ngot', 300, 'Cải ngọt nhặt, rửa sạch, cắt khúc', 6, 'Cho cải khi nước đang sôi, nấu 2 phút là chín', 'Cải thìa.', 'canh_tomkho'),
    ('Canh cải xanh', 'cai_xanh', 300, 'Cải xanh nhặt, rửa sạch, cắt khúc', 6, 'Cải xanh hơi hăng, thêm vài lát gừng giúp dịu vị', 'Cải ngọt.', 'canh_tomkho'),
    ('Canh khoai mỡ', 'khoai_mo', 300, 'Khoai mỡ gọt vỏ, thái miếng', 20, 'Nấu đến khi khoai hơi tan làm nước canh sánh', 'Khoai sọ.', 'canh_tomkho'),
    ('Canh mồng tơi', 'mong_toi', 300, 'Mồng tơi nhặt, rửa sạch', 8, 'Giã nhẹ rau hoặc vò một chút để canh có độ nhớt mát', 'Rau đay, rau dền.', 'canh_tomkho'),
    ('Canh mướp', 'muop', 400, 'Mướp gọt vỏ, thái khúc xéo', 8, 'Cho mướp khi nước đã sôi, chín tới thì tắt bếp', 'Bầu.', 'canh_tomkho'),
    ('Canh rau dền', 'rau_dien', 300, 'Rau dền nhặt, rửa sạch', 8, 'Nấu nhanh để rau còn xanh; hợp với ngày nóng', 'Mồng tơi.', 'canh_tomkho'),
    ('Canh rau ngót', 'rau_ngot', 250, 'Rau ngót tuốt lá, rửa sạch', 8, 'Rau ngót nên nấu vừa chín, không đậy vung', 'Rau dền.', 'canh_tomkho'),
    ('Canh bí đỏ', 'bi_do', 400, 'Bí đỏ gọt vỏ, thái miếng', 15, 'Có thể dầm nhẹ vài miếng bí để canh sánh bùi', 'Khoai lang.', 'canh_tomkho'),
]


# =============================================================== sinh dòng
def _tx_rau_toi(name, v, q, prep, cook, tip, sub):
    steps = [prep,
             'Đun nóng 1,5 muỗng canh dầu, phi 4 tép tỏi băm đến thơm',
             f'Cho rau vào, xào lửa lớn khoảng {cook} phút, đảo đều tay',
             'Nêm 1/2 muỗng cà phê muối, 1/2 muỗng cà phê hạt nêm, rắc ít tiêu rồi tắt bếp khi rau còn xanh giòn']
    return L(name, 'rau', 'xao', 'rau', 8 + cook, 1, 3, f'{v}:{q} dau_an:1.5 toi:4 muoi:0.5 hat_nem:0.5 tieu:0.25', steps, tip, sub)


def _tx_rau_thit(name, v, q, meat, mq, prep, cook, tip, sub):
    steps = [prep + '; thịt ướp 1 muỗng nước mắm, 1/2 muỗng đường, chút tiêu trong 10 phút',
             'Phi 3 tép tỏi và 1 củ hành tím băm với 1 muỗng canh dầu, cho thịt vào xào săn',
             f'Cho rau vào, xào lửa lớn khoảng {cook} phút, thêm 1-2 muỗng canh nước nếu cần',
             'Nêm lại cho vừa ăn, rắc tiêu và tắt bếp']
    return L(name, 'rau', 'xao', 'rau', 12 + cook, 1, 3,
             f'{v}:{q} {meat}:{mq} dau_an:1.5 toi:3 hanh_tim:1 nuoc_mam:1 duong:0.5 tieu:0.25', steps, tip, sub)


def _tx_rau_trung(name, v, q, prep, cook, tip, sub):
    steps = [prep + '; đánh 3 quả trứng với 1/2 muỗng nước mắm',
             'Phi 3 tép tỏi với 1,5 muỗng canh dầu',
             f'Cho rau vào xào khoảng {cook} phút đến khi gần chín',
             'Đổ trứng vào, để hơi đông rồi đảo nhẹ, nêm vừa ăn và tắt bếp']
    return L(name, 'rau', 'xao', 'rau', 10 + cook, 1, 3,
             f'{v}:{q} trung_ga:3 dau_an:1.5 toi:3 nuoc_mam:1 hat_nem:0.5 tieu:0.25', steps, tip, sub)


def _tx_canh_bam(name, v, q, prep, cook, tip, sub):
    steps = ['Thịt băm trộn với 1 muỗng cà phê hạt nêm, ít tiêu, ướp 10 phút; ' + prep,
             'Đun sôi 1 lít nước, phi 1 củ hành tím rồi cho thịt băm vào đảo vón cục',
             'Đổ nước vào nấu sôi, vớt bọt',
             f'Cho rau vào, nấu khoảng {cook} phút đến khi chín tới',
             'Nêm 1/2 muỗng cà phê muối, nửa muỗng cà phê hạt nêm, rắc hành lá và tắt bếp']
    return L(name, 'canh', 'canh', 'canh', 12 + cook, 1, 4,
             f'{v}:{q} thit_bam:100 hanh_tim:1 muoi:0.5 hat_nem:1 hanh_la:10 tieu:0.25 dau_an:0.5', steps, tip, sub)


def _tx_canh_rau(name, v, q, prep, cook, tip, sub, _):
    steps = [prep + '; tôm khô ngâm nước ấm 10 phút, giã nhỏ',
             'Đun sôi 1 lít nước, thả tôm khô vào nấu 5 phút cho ra vị ngọt',
             f'Cho rau vào nấu khoảng {cook} phút đến khi chín tới',
             'Nêm 1/2 muỗng cà phê muối, 1/2 muỗng cà phê hạt nêm, rắc hành lá rồi tắt bếp']
    return L(name, 'canh', 'canh', 'canh', 8 + cook, 1, 4,
             f'{v}:{q} tom_kho:15 muoi:0.5 hat_nem:0.5 hanh_la:10', steps, tip, sub)


def all_lines():
    out = []
    for t in RAU_TOI: out.append(_tx_rau_toi(*t))
    for t in RAU_THIT: out.append(_tx_rau_thit(*t))
    for t in RAU_TRUNG: out.append(_tx_rau_trung(*t))
    for t in CANH_BAM: out.append(_tx_canh_bam(*t))
    for t in CANH_RAU: out.append(_tx_canh_rau(*t))
    return out


# ============================================ xào thịt + rau (gà, bò) ====
# (tên, nhóm, đạm, g, rau "id:qty ...", sơ chế, phút xào rau, mẹo, thay thế, nêm)
XAO_PV = [
    ('Bò / trâu xào rau muống', 'bo', 'bo_thit', 200, 'rau_muong:300', 'Rau muống nhặt, ngắt khúc, để ráo; bò thái mỏng', 2, 'Xào thật nhanh tay, lửa lớn: rau muống xanh giòn, bò mềm', 'Thịt trâu hoặc cải ngọt.', 'dau_hao:1'),
    ('Bò xào cần tây', 'bo', 'bo_thit', 200, 'can_tay:200 ca_rot:0.5', 'Cần tây cắt khúc, cà rốt thái lát; bò thái mỏng', 3, 'Ướp bò với 1 muỗng bột năng và chút dầu để thịt mềm', 'Cần nước.', 'dau_hao:1'),
    ('Bò xào dưa chua', 'bo', 'bo_thit', 200, 'dua_chua:150 hanh_tim:1', 'Dưa chua rửa qua nước, vắt ráo; bò thái mỏng', 3, 'Dưa đã mặn nên không nêm thêm muối; thêm ít đường cho cân vị', 'Cải chua.', 'duong:0.5'),
    ('Bò xào hoa thiên lý', 'bo', 'bo_thit', 200, 'hoa_thien_ly:200', 'Hoa thiên lý nhặt, rửa sạch; bò thái mỏng', 2, 'Hoa thiên lý chín rất nhanh, xào khoảng 1-2 phút thôi', 'Rau muống, đọt bí.', 'dau_hao:1'),
    ('Bò xào nấm', 'bo', 'bo_thit', 200, 'nam_thap_cam:200 hanh_tay:0.5', 'Nấm rửa sạch, cắt đôi; bò thái mỏng', 4, 'Xào nấm riêng cho ráo bớt nước rồi mới kết hợp với bò', 'Nấm bào ngư.', 'dau_hao:1'),
    ('Bò xào ngô bao tử', 'bo', 'bo_thit', 200, 'ngo_bao_tu:150 ca_rot:0.5 hanh_tay:0.5', 'Ngô bao tử cắt đôi; cà rốt thái lát; bò thái mỏng', 4, 'Chần ngô bao tử 1 phút nếu muốn mềm hơn', 'Bông cải.', 'dau_hao:1'),
    ('Bò xào rau thập cẩm', 'bo', 'bo_thit', 200, 'bong_cai:100 ca_rot:1 ngo_bao_tu:80 nam_thap_cam:80', 'Rau củ rửa sạch, cắt miếng vừa ăn; bò thái mỏng', 4, 'Rau cứng (cà rốt) xào trước, rau mềm xào sau', 'Dùng rau củ theo mùa.', 'dau_hao:1'),
    ('Bò xào su su', 'bo', 'bo_thit', 200, 'su_su:300', 'Su su gọt vỏ, thái sợi; bò thái mỏng', 4, 'Su su ra nước nên xào lửa lớn để giữ độ giòn', 'Bí xanh.', 'dau_hao:1'),
    ('Bò xào súp lơ', 'bo', 'bo_thit', 200, 'bong_cai:250 ca_rot:0.5', 'Súp lơ cắt cụm nhỏ, chần 1 phút; cà rốt thái lát; bò thái mỏng', 3, 'Chần súp lơ giữ độ giòn và màu xanh', 'Bông cải xanh.', 'dau_hao:1'),
    ('Bò xào đỗ', 'bo', 'bo_thit', 200, 'gia:200 he:30', 'Giá rửa sạch, ráo nước; hẹ cắt khúc; bò thái mỏng', 2, 'Xào thật nhanh, lửa rất lớn để giá không ra nước', 'Giá xanh.', 'nuoc_mam:1'),
    ('Bò xào hành tây', 'bo', 'bo_thit', 250, 'hanh_tay:1.5', 'Hành tây thái múi; bò thái mỏng', 3, 'Cho hành tây vào sau cùng để còn giòn ngọt', 'Ớt chuông.', 'dau_hao:1'),
    ('Gà xào bắp cải', 'ga', 'ga_uc', 250, 'bap_cai:300', 'Bắp cải thái miếng; ức gà thái mỏng', 4, 'Dùng ức gà ướp bột năng cho mềm', 'Cải thảo.', 'nuoc_mam:1'),
    ('Gà xào cải chua', 'ga', 'ga_dui', 300, 'dua_chua:200 hanh_tim:1', 'Cải chua rửa qua nước, vắt ráo; đùi gà lọc xương, thái miếng', 5, 'Cải chua đã mặn, chỉ nêm thêm chút đường', 'Dưa cải muối.', 'duong:0.5'),
    ('Gà xào giá', 'ga', 'ga_uc', 250, 'gia:200 he:30', 'Giá rửa ráo; hẹ cắt khúc; ức gà thái mỏng', 2, 'Xào lửa lớn, vừa chín giá thì tắt bếp', 'Giá xanh.', 'nuoc_mam:1'),
    ('Gà xào hành tây', 'ga', 'ga_uc', 250, 'hanh_tay:1.5', 'Hành tây thái múi; ức gà thái mỏng', 3, 'Ướp gà với chút bột năng cho mềm', 'Ớt chuông.', 'dau_hao:1'),
    ('Gà xào húng quế', 'ga', 'ga_dui', 300, 'hung_que:30 ot:2 hanh_tay:0.5', 'Đùi gà lọc xương, thái miếng; húng quế nhặt lá', 3, 'Cho húng quế vào sau cùng, tắt bếp rồi mới đảo đều', 'Rau quế.', 'nuoc_mam:1'),
    ('Gà xào lá chanh', 'ga', 'ga_dui', 300, 'la_chanh:10 sa:2 ot:2', 'Lá chanh thái sợi nhỏ; sả băm; đùi gà thái miếng', 3, 'Lá chanh thái thật nhỏ sẽ thơm hơn', 'Lá chanh.', 'nuoc_mam:1.5'),
    ('Gà xào nấm bào ngư', 'ga', 'ga_uc', 250, 'nam_bao_ngu:200', 'Nấm bào ngư xé sợi; ức gà thái mỏng', 4, 'Nấm xào ráo nước trước rồi mới cho gà vào', 'Nấm rơm.', 'dau_hao:1'),
    ('Gà xào nấm đùi gà', 'ga', 'ga_uc', 250, 'nam_dui_ga:200', 'Nấm đùi gà thái lát dày; ức gà thái mỏng', 4, 'Xào nấm lửa lớn để nấm săn, không ra nước', 'Nấm hương.', 'dau_hao:1'),
    ('Gà xào nấm mèo', 'ga', 'ga_dui', 300, 'moc_nhi:10 hanh_tay:0.5', 'Mộc nhĩ ngâm nở, cắt sợi; đùi gà thái miếng', 4, 'Mộc nhĩ giàu sắt, thích hợp cho ngày hành kinh', 'Nấm hương.', 'dau_hao:1'),
    ('Gà xào đậu que', 'ga', 'ga_dui', 300, 'dau_que:250', 'Đậu que tuốt xơ, cắt khúc, chần 1 phút; đùi gà thái miếng', 6, 'Đậu que xào chín kỹ, thêm chút nước và đậy vung', 'Đậu cô ve.', 'nuoc_mam:1'),
]

# xáo: ít nước, ninh nhanh. (tên, đạm, g, thành phần, sơ chế, mẹo, thay thế)
XAO_GA = [
    ('Gà xáo gừng', 'gung:40', 'Gà chặt miếng, gừng thái sợi', 'Gừng ấm bụng, hợp ngày lạnh hoặc cơ thể mệt', 'Thịt vịt.'),
    ('Gà xáo nấm', 'nam_dui_ga:200', 'Gà chặt miếng, nấm cắt đôi', 'Nấm cho vào khi gà gần chín để giữ độ giòn', 'Nấm rơm, nấm hương.'),
    ('Gà xáo sả', 'sa:3 ot:1', 'Gà chặt miếng, sả đập dập, thái khúc', 'Sả đập dập để thơm đậm hơn', 'Lá chanh.'),
]


def _tx_xao_pv(name, grp, prot, pq, veg, prep, cook, tip, sub, extra):
    ex = {'dau_hao:1': ('dầu hào', 1), 'nuoc_mam:1': ('nước mắm', 1), 'duong:0.5': ('đường', 0.5), 'nuoc_mam:1.5': ('nước mắm', 1.5)}
    steps = [prep + '; thịt ướp 1 muỗng nước mắm, 1/2 muỗng đường, chút tiêu, 1 muỗng bột năng trong 15 phút',
             'Phi 3 tép tỏi với 1,5 muỗng canh dầu, cho thịt vào xào lửa lớn đến săn rồi vớt ra',
             f'Cho rau củ vào xào lửa lớn khoảng {cook} phút',
             'Cho thịt trở lại chảo, nêm vừa ăn, đảo đều 1 phút rồi tắt bếp']
    return L(name, grp, 'xao', 'man', 15 + cook, 1, 3,
             f'{prot}:{pq} {veg} dau_an:1.5 toi:3 nuoc_mam:1 duong:0.5 bot_nang:1 tieu:0.25 {extra}', steps, tip, sub)


def _tx_xao_ga(name, veg, prep, tip, sub):
    steps = [prep + '; ướp gà với 1 muỗng nước mắm, 1/2 muỗng đường, chút tiêu 15 phút',
             'Phi hành tỏi băm thơm, cho gà vào xào săn',
             'Thêm 100 ml nước, đậy vung đun lửa vừa 10 phút',
             'Cho thành phần chính vào, nấu thêm 5 phút đến khi gà chín mềm, nước hơi sánh']
    return L(name, 'ga', 'xao', 'man', 35, 1, 4,
             f'ga_dui:500 {veg} nuoc_mam:1.5 duong:0.5 hanh_tim:2 toi:3 tieu:0.5 dau_an:1.5', steps, tip, sub)


_old_all = all_lines


def all_lines():
    out = _old_all()
    for t in XAO_PV: out.append(_tx_xao_pv(*t))
    for n, v, prep, tip, sub in XAO_GA: out.append(_tx_xao_ga(n, v, prep, tip, sub))
    return out


# =========================================================== cá ===========
# kho: (tên, cá, g, nguyên liệu thêm, bước đặc trưng, phút kho, mẹo, thay thế)
CA_KHO = [
    ('Cá bạc má kho cà', 'ca_bac_ma', 500, 'ca_chua:3 hanh_la:10 tieu:0.5', 'Xếp cà chua bổ múi lên trên cá', 25, 'Cá bạc má nhiều dầu, kho với cà chua giúp bớt ngấy', 'Cá nục.'),
    ('Cá bạc má kho tiêu', 'ca_bac_ma', 500, 'tieu:2', 'Rắc tiêu giã dập vào nồi', 25, 'Tiêu cho vào cuối để giữ độ cay thơm', 'Cá nục.'),
    ('Cá basa kho gừng', 'ca_basa', 500, 'gung:40 tieu:0.5', 'Cho gừng thái sợi vào nồi trước khi xếp cá', 25, 'Gừng giúp khử mùi tanh cá basa', 'Cá rô phi.'),
    ('Cá basa kho nghệ', 'ca_basa', 500, 'nghe:15 tieu:0.5', 'Trộn nghệ giã vào phần ướp cá', 25, 'Nghệ làm cá thơm và vàng đẹp', 'Cá lóc.'),
    ('Cá basa kho tiêu', 'ca_basa', 500, 'tieu:2', 'Rắc tiêu xay vào nồi', 25, 'Chiên sơ cá trước khi kho để không nát', 'Cá rô phi.'),
    ('Cá bống kho tiêu', 'ca_bong', 400, 'tieu:2 gung:15', 'Xếp cá nhỏ vào nồi, thêm gừng', 30, 'Kho lửa rất nhỏ để cá bống chín nhừ', 'Cá cơm.'),
    ('Cá bống kho tiêu xanh', 'ca_bong', 400, 'tieu:1 gung:15', 'Cho tiêu xanh vào kho cùng', 30, 'Tiêu xanh tươi cho vị cay dịu', 'Tiêu đen.'),
    ('Cá cơm kho thịt ba chỉ', 'ca_com', 300, 'ba_chi:150 tieu:1 gung:10', 'Xào ba chỉ cho ra mỡ rồi xếp cá lên', 35, 'Thịt ba chỉ giúp cá cơm béo và thơm', 'Thịt nạc vai.'),
    ('Cá cơm kho tiêu', 'ca_com', 300, 'tieu:2 gung:10', 'Xếp cá vào nồi, rắc tiêu', 25, 'Cá cơm kho khô, ăn cơm rất đưa', 'Cá nhỏ khác.'),
    ('Cá kho dưa chua', 'ca_nuc', 500, 'dua_chua:200', 'Xếp dưa chua đã rửa qua xuống đáy nồi, đặt cá lên', 30, 'Dưa chua đã mặn nên giảm nước mắm', 'Cá chép, cá basa.'),
    ('Cá kho khế chua', 'ca_nuc', 500, 'khe:1 ca_chua:1 tieu:0.5', 'Cho khế thái lát và cà chua vào kho cùng', 25, 'Khế chua giúp cá mềm, bớt tanh', 'Me.'),
    ('Cá kho măng', 'ca_ro_phi', 500, 'mang_tuoi:200 tieu:0.5', 'Xào măng với hành tỏi trước, xếp xuống nồi', 30, 'Luộc măng 2 lần nước để bớt hăng', 'Dưa chua.'),
    ('Cá kho mít non', 'ca_ro_phi', 500, 'mit_non:200 gung:20', 'Mít non luộc, thái miếng, xếp dưới đáy nồi', 35, 'Mít non cần luộc kỹ trước để mềm', 'Măng.'),
    ('Cá kho tộ', 'ca_loc', 600, 'ba_chi:100 tieu:1 ot:2 nuoc_dua:100', 'Xào ba chỉ, thêm nước dừa vào kho', 40, 'Kho trong nồi đất, lửa nhỏ liu riu, nước dừa tươi cho vị đậm đà', 'Cá basa.'),
    ('Cá kho trám', 'ca_ro_phi', 500, 'sung:100 gung:20', 'Cho trám (hoặc sung) vào kho cùng', 35, 'Trám đen tạo hương đặc trưng miền Bắc', 'Cà pháo.'),
    ('Cá kho tương', 'ca_ro_phi', 500, 'tuong_ban:2 gung:20 tieu:0.5', 'Thay nước mắm bằng tương bần, thêm gừng', 30, 'Tương bần đã mặn nên không cần thêm nhiều nước mắm', 'Cá basa.'),
    ('Cá lóc kho nghệ', 'ca_loc', 600, 'nghe:20 tieu:0.5', 'Ướp cá với nghệ giã nhỏ', 30, 'Cá lóc kho nghệ ăn rất ngon, thịt chắc ngọt', 'Cá basa.'),
    ('Cá nục kho cà chua', 'ca_nuc', 500, 'ca_chua:3 hanh_la:10', 'Xào cà chua thành sốt, xếp cá vào kho', 25, 'Xào cà chua kỹ để lên màu đẹp', 'Cá bạc má.'),
    ('Cá nục kho tiêu', 'ca_nuc', 500, 'tieu:2', 'Rắc tiêu xay vào nồi', 25, 'Kho lửa nhỏ để cá thấm vị', 'Cá bạc má.'),
    ('Cá rô phi kho nghệ', 'ca_ro_phi', 500, 'nghe:15 tieu:0.5', 'Ướp cá với nghệ giã nhỏ', 30, 'Chiên sơ cá để kho không bị nát', 'Cá lóc.'),
    ('Cá rô phi kho tiêu', 'ca_ro_phi', 500, 'tieu:2', 'Rắc tiêu xay vào nồi', 30, 'Rô phi cần chiên sơ để se mặt', 'Cá basa.'),
    ('Cá bống kho gừng', 'ca_bong', 400, 'gung:40 tieu:0.5', 'Cho gừng thái sợi vào nồi', 30, 'Gừng ấm giúp món hợp ngày mưa lạnh', 'Cá cơm.'),
    ('Cá bống kho riềng', 'ca_bong', 400, 'rieng:30 tieu:0.5', 'Cho riềng thái lát vào nồi', 30, 'Riềng làm cá thơm đặc trưng', 'Gừng.'),
    ('Cá mòi kho dưa chua', 'ca_moi', 400, 'dua_chua:200 gung:15', 'Xếp dưa chua rửa qua dưới nồi, đặt cá mòi lên', 30, 'Cá mòi giàu omega-3 và sắt', 'Cá nục.'),
]

CA_CHIEN = [
    ('Cá bạc má chiên', 'ca_bac_ma', 500, 'Ướp cá với muối, tiêu, 1/2 muỗng nghệ 15 phút', 'Chiên vàng giòn hai mặt', 'Lau thật khô cá trước khi chiên để không bắn dầu', 'Cá nục.', 'bot_nghe:0.5'),
    ('Cá bạc má chiên mắm tỏi', 'ca_bac_ma', 500, 'Cá ướp muối, tiêu 15 phút', 'Chiên vàng; đun nước mắm, đường, tỏi băm thành sốt, rưới lên', 'Cho tỏi vào sốt khi nước đã gần sệt để tỏi thơm', 'Cá nục.', 'nuoc_mam:2 duong:1.5 toi:5'),
    ('Cá basa chiên giòn', 'ca_basa', 400, 'Cá thái miếng, ướp muối, tiêu; lăn bột mì', 'Chiên vàng giòn', 'Lăn bột mỏng để vỏ giòn', 'Cá rô phi.', 'bot_mi:40'),
    ('Cá basa chiên sốt mắm', 'ca_basa', 400, 'Cá thái miếng, ướp muối, tiêu', 'Chiên vàng; đun nước mắm, đường, tỏi ớt, rưới lên', 'Chiên cá vừa chín tới, đừng chiên quá khô', 'Cá rô phi.', 'nuoc_mam:2 duong:1.5 toi:4 ot:1'),
    ('Cá chiên xù thì là', 'ca_basa', 400, 'Cá thái miếng, ướp muối, tiêu, lăn bột mì, trứng, bột chiên xù', 'Chiên vàng giòn, rắc thì là thái nhỏ', 'Thì là cho thơm, hợp với cá', 'Cá rô phi.', 'bot_mi:30 bot_chien_xu:50 trung_ga:1 thi_la:20'),
    ('Cá cơm chiên giòn', 'ca_com', 300, 'Cá cơm làm sạch, ướp muối tiêu; lăn bột mì mỏng', 'Chiên vàng giòn', 'Ăn cả xương rất giàu canxi', 'Cá nhỏ khác.', 'bot_mi:30'),
    ('Cá nhỏ rán giòn', 'ca_nho', 300, 'Cá làm sạch, ướp muối; lăn bột mì', 'Rán lửa vừa đến vàng giòn', 'Ăn cùng nước mắm chanh ớt', 'Cá cơm.', 'bot_mi:30'),
    ('Cá nục chiên giòn', 'ca_nuc', 500, 'Cá ướp muối, tiêu, 15 phút', 'Chiên vàng giòn', 'Lau khô cá trước khi chiên', 'Cá bạc má.', ''),
    ('Cá nục chiên nước mắm', 'ca_nuc', 500, 'Cá ướp muối, tiêu', 'Chiên vàng; đun nước mắm, đường, tỏi, rưới lên', 'Nêm sốt vừa vị, đừng quá mặn', 'Cá bạc má.', 'nuoc_mam:2 duong:1.5 toi:4'),
    ('Cá rán mắm tỏi ớt tiêu', 'ca_ro_phi', 500, 'Cá ướp muối, tiêu 15 phút', 'Chiên vàng; xào tỏi ớt với nước mắm, đường, tiêu, rưới lên', 'Chiên lửa vừa để da giòn mà thịt không khô', 'Cá basa.', 'nuoc_mam:2 duong:1.5 toi:5 ot:2 tieu:1'),
    ('Cá rô phi chiên', 'ca_ro_phi', 500, 'Cá làm sạch, ướp muối, nghệ', 'Chiên vàng giòn hai mặt', 'Rạch vài đường trên thân cá cho thấm gia vị', 'Cá basa.', 'bot_nghe:0.5'),
    ('Cá rô phi chiên mắm', 'ca_ro_phi', 500, 'Cá ướp muối, tiêu', 'Chiên vàng; xào nước mắm, đường, tỏi, ớt rồi rưới lên', 'Rưới sốt khi cá còn nóng để thấm', 'Cá basa.', 'nuoc_mam:2 duong:1.5 toi:4 ot:1'),
    ('Cá trứng chiên giòn', 'ca_trung', 400, 'Cá ướp muối, tiêu', 'Chiên vàng giòn', 'Chiên lửa vừa để trứng cá chín đều', 'Cá nục.', ''),
    ('Cá cam chiên giòn', 'ca_cam', 400, 'Cá ướp muối, tiêu', 'Chiên vàng giòn', 'Thịt cá cam chắc, chiên giòn rất ngon', 'Cá nục.', ''),
]

CA_HAP = [
    ('Cá basa hấp gừng', 'ca_basa', 400, 'gung:30 hanh_la:20 nuoc_tuong:1.5', 'Gừng thái sợi rải lên cá, hấp 12 phút; rưới nước tương, dầu nóng'),
    ('Cá hấp bia', 'ca_ro_phi', 500, 'bia:150 gung:20 hanh_la:20 ca_chua:1 nuoc_tuong:1.5', 'Cá ướp bia, gừng, hành; thêm cà chua, hấp 15 phút'),
    ('Cá hấp hành thì là', 'ca_ro_phi', 500, 'thi_la:30 hanh_la:20 gung:20 nuoc_tuong:1.5', 'Cá ướp muối, hấp 15 phút; rắc hành thì là, rưới nước tương nóng'),
    ('Cá hấp mắm gừng', 'ca_ro_phi', 500, 'gung:30 nuoc_mam:1.5 hanh_la:20 ot:1', 'Cá ướp gừng, hấp 15 phút; rưới nước mắm gừng chua ngọt'),
    ('Cá hấp xì dầu gừng thì là', 'ca_ro_phi', 500, 'nuoc_tuong:2 gung:30 thi_la:20 hanh_la:20', 'Cá hấp 15 phút, rưới xì dầu, gừng, thì là, dầu nóng'),
    ('Cá lóc hấp hành', 'ca_loc', 600, 'hanh_la:30 gung:20 nuoc_tuong:1.5 nuoc_mam:0.5', 'Cá lóc ướp gừng, hấp 15 phút; rắc hành, rưới nước tương'),
    ('Cá rô phi hấp hành gừng', 'ca_ro_phi', 500, 'gung:30 hanh_la:20 nuoc_tuong:1.5 muoi:0.5', 'Cá ướp gừng, muối, hấp 15 phút; rắc hành, rưới dầu nóng'),
    ('Cá diêu hồng hấp xì dầu', 'ca_dieu_hong', 600, 'nuoc_tuong:2 gung:30 hanh_la:20 ot:1', 'Cá ướp gừng, hấp 15 phút; rưới xì dầu, hành, ớt, dầu nóng'),
]


def _tx_ca_kho(name, fish, fq, extra, special, t, tip, sub):
    steps = ['Cá làm sạch, cắt khúc; ướp 2 muỗng nước mắm, 1 muỗng đường, hành tỏi băm, tiêu 20 phút',
             'Thắng 1 muỗng đường thành nước màu cánh gián, cho cá vào đảo nhẹ',
             special,
             f'Thêm nước xâm xấp cá, đun sôi rồi hạ lửa nhỏ kho khoảng {t} phút',
             'Nêm lại vị, kho đến khi nước sánh còn khoảng 1/3 thì tắt bếp']
    return L(name, 'ca', 'kho', 'man', t + 20, 2 if t >= 35 else 1, 4,
             f'{fish}:{fq} {extra} nuoc_mam:2 duong:2 hanh_tim:2 toi:3 dau_an:0.5 nuoc_mau:0.5', steps, tip, sub)


def _tx_ca_chien(name, fish, fq, prep, cook, tip, sub, extra):
    steps = ['Cá làm sạch, rửa với chút muối, để ráo', prep + ' trong 15 phút',
             'Đun nóng dầu ngập 1/3 cá, chiên lửa vừa ' + cook,
             'Vớt cá ra giấy thấm dầu; dọn kèm nước mắm chua ngọt hoặc rau sống']
    return L(name, 'ca', 'chien', 'man', 35, 2, 4,
             f'{fish}:{fq} dau_an:4 muoi:0.5 tieu:0.25 {extra}', steps, tip, sub)


def _tx_ca_hap(name, fish, fq, extra, step):
    steps = ['Cá làm sạch, rạch vài đường trên thân', 'Ướp cá với chút muối, gừng 10 phút',
             step, 'Dọn nóng ngay khi cá còn mềm ngọt']
    return L(name, 'ca', 'hap', 'man', 30, 1, 4,
             f'{fish}:{fq} {extra} muoi:0.5 dau_an:1', steps,
             'Nước hấp sôi hẳn mới cho cá vào hấp để thịt cá ngọt và chắc',
             'Cá khác cùng loại thịt trắng.')


_old_all2 = all_lines


def all_lines():
    out = _old_all2()
    for t in CA_KHO: out.append(_tx_ca_kho(*t))
    for t in CA_CHIEN: out.append(_tx_ca_chien(*t))
    for t in CA_HAP: out.append(_tx_ca_hap(*t))
    return out


# ========================================================== trứng =========
# (tên, nguyên liệu thêm, sơ chế/trộn, mẹo, thay thế)
TRUNG_CHIEN = [
    ('Trứng chiên bắp cải', 'bap_cai:100 hanh_la:10', 'Bắp cải thái sợi nhỏ, hành lá cắt nhỏ; trộn vào trứng đã đánh', 'Bắp cải thái thật mỏng để trứng chín đều', 'Cải thảo.'),
    ('Trứng chiên cà chua', 'ca_chua:1.5 hanh_la:10', 'Cà chua thái hạt lựu; trộn vào trứng đã đánh', 'Vắt bớt nước cà chua để trứng không bị nhũn', 'Cà chua bi.'),
    ('Trứng chiên giá', 'gia:100 hanh_la:10', 'Giá rửa ráo, trộn vào trứng đã đánh', 'Chiên vừa chín tới để giá còn giòn', 'Giá xanh.'),
    ('Trứng chiên hành tây', 'hanh_tay:0.5', 'Hành tây thái nhỏ; trộn vào trứng', 'Cho hành tây xào sơ trước nếu muốn bớt hăng', 'Hành tím.'),
    ('Trứng chiên nước mắm', 'nuoc_mam:1 hanh_la:10', 'Đánh trứng với nước mắm, hành lá', 'Nước mắm cho vào khi đánh trứng để trứng đậm vị', 'Nước tương.'),
    ('Trứng chiên đậu phụ', 'dau_phu:1 hanh_la:10', 'Đậu phụ nghiền nát, trộn vào trứng đã đánh', 'Nghiền đậu phụ mịn để trứng bông xốp', 'Đậu hũ non.'),
    ('Trứng rán hành', 'hanh_la:30', 'Hành lá cắt nhỏ trộn vào trứng đã đánh', 'Hành lá nhiều giúp trứng thơm', 'Hành tím.'),
    ('Trứng rán hàu', 'hau:100 hanh_la:20', 'Hàu rửa sạch, trộn vào trứng đã đánh', 'Cho hàu vào sau, tránh nấu quá lâu', 'Tôm bóc vỏ.'),
    ('Trứng rán hẹ', 'he:50', 'Hẹ cắt nhỏ trộn vào trứng đã đánh', 'Hẹ giúp trứng thơm và ấm bụng', 'Hành lá.'),
    ('Trứng rán lá mơ', 'la_mo:30', 'Lá mơ thái nhỏ, trộn vào trứng', 'Lá mơ có mùi đặc trưng, tốt cho tiêu hóa', 'Hành lá.'),
    ('Trứng rán ngải cứu', 'ngai_cuu:30', 'Ngải cứu thái nhỏ, trộn vào trứng', 'Ngải cứu tính ấm, hợp ngày hành kinh', 'Hẹ.'),
    ('Trứng rán thịt băm', 'thit_bam:80 hanh_la:10', 'Thịt băm xào sơ, trộn vào trứng đã đánh', 'Xào thịt chín trước để trứng không bị sống', 'Tôm băm.'),
]


def _tx_trung_chien(name, extra, prep, tip, sub):
    steps = [prep + '; thêm 1/2 muỗng cà phê hạt nêm, chút tiêu',
             'Đun nóng 2 muỗng canh dầu trong chảo',
             'Đổ trứng vào, chiên lửa vừa 2-3 phút mỗi mặt đến khi vàng đều',
             'Cắt miếng, dọn nóng với cơm']
    return L(name, 'trung', 'chien', 'man', 12, 1, 3,
             f'trung_ga:4 {extra} dau_an:2 hat_nem:0.5 tieu:0.25', steps, tip, sub)


_old_all3 = all_lines


def all_lines():
    out = _old_all3()
    for t in TRUNG_CHIEN: out.append(_tx_trung_chien(*t))
    return out
