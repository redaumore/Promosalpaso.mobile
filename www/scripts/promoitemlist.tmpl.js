(function(){dust.register("promoitemlist",body_0);function body_0(chk,ctx){return chk.write("(function(){dust.register(\"promoitemlist\",body_0);function body_0(chk,ctx){return chk.section(ctx.get(\"json\"),ctx,{\"block\":body_1},null);}function body_1(chk,ctx){return chk.write(\"<li data-corners=\\\"false\\\" data-shadow=\\\"false\\\" data-iconshadow=\\\"true\\\" data-wrapperels=\\\"div\\\" data-icon=\\\"arrow-r\\\" data-iconpos=\\\"right\\\" data-theme=\\\"a\\\" class=\\\"ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a ui-li-static\\\"  style=\\\"padding: 0px; border: 1px solid #666666\\\"><div class=\\\"ui-btn-inner ui-li ui-li-static ui-btn-up-a\\\" style=\\\"padding: 0px;\\\"><div class=\\\"ui-btn-text registro\\\"><a href=\\\"#\\\" data-transition=\\\"slide\\\" onclick=\\\"gotoPromo(\").reference(ctx.get(\"promotion_id\"),ctx,\"h\").write(\");\\\"><table class=\\\"aviso\\\"><tr><td class=\\\"lst-image\\\"><img src=\\\"\").reference(ctx.get(\"path\"),ctx,\"h\").write(\"\\\" class=\\\"shadow image\\\"></td><td style=\\\"border-right: solid 1px #9CAAC6;\\\"><p class=\\\"ui-li-desc comercio\\\">\").reference(ctx.get(\"name\"),ctx,\"h\").write(\"</p><div class=\\\"descripcion ui-li-desc det-font-oscuro\\\">\").reference(ctx.get(\"short_description\"),ctx,\"h\").write(\"</div><p class=\\\"lst-promo ui-li-desc\\\">\").reference(ctx.get(\"displayed_text\"),ctx,\"h\").write(\"</p></td><td style=\\\"width: 45px;\\\"><div style=\\\"text-align: center;\\\">\").section(ctx.get(\"value_since\"),ctx,{\"else\":body_2,\"block\":body_3},null).write(\"<div><span class=\\\"precio\\\">\").reference(ctx.get(\"promo_value\"),ctx,\"h\").write(\"</span></div><div style=\\\"border-top: solid 1px #9CAAC6; vertical-align: middle; text-align: center\\\"><span class=\\\"distancia det-font-oscuro\\\">\").reference(ctx.get(\"distance\"),ctx,\"h\").write(\"</span></div></div></td></tr></table></a></div></div></li>\");}function body_2(chk,ctx){return chk.write(\"<div class=\\\"desde\\\" style=\\\"display: none;\\\">desde</div>\");}function body_3(chk,ctx){return chk.write(\"<div class=\\\"desde\\\" style=\\\"display: inline;\\\">desde</div>\");}return body_0;})();");}return body_0;})();