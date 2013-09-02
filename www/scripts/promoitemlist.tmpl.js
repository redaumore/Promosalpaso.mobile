{#json}
<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="a" class="ui-btn ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a ui-li-static"  style="padding: 0px; border: 1px solid #666666">
   <div class="ui-btn-inner ui-li ui-li-static ui-btn-up-a" style="padding: 0px;">
       <div class="ui-btn-text registro">
           <a href="#" data-transition="slide" onclick="gotoPromo({promotion_id});">
               <table class="aviso">
                  <tr>
                     <td class="lst-image">
                        <img src="{path}" class="shadow image">
                     </td>
                     <td style="border-right: solid 1px #9CAAC6;">
                        <p class="ui-li-desc comercio">{name}</p>
                        <div class="descripcion ui-li-desc det-font-oscuro">{short_description}</div>
                        <p class="lst-promo ui-li-desc">{displayed_text}</p>
                     </td>
                     <td style="width: 45px;">
                        <div style="text-align: center;">
							{#value_since}
								<div class="desde" style="display: inline;">desde</div>
							{:else}
								<div class="desde" style="display: none;">desde</div>
							{/value_since}
                            <div><span class="precio">{promo_value}</span></div>
                            <div style="border-top: solid 1px #9CAAC6; vertical-align: middle; text-align: center"><span class="distancia det-font-oscuro">{distance}</span></div>
                        </div>
                     </td>
                  </tr>
			  </table>
            </a>
		</div>
	</div>
</li>
{/json}