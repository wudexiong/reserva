 // 将oneName|twoName|threeName|foodName属性名统一转换为label
 // eslint-disable-next-line import/prefer-default-export
 export function json(data) {
   return JSON.parse(
     JSON.stringify(data).replace(
       /oneName|twoName|threeName|foodName/g,
       'label',
     ),
   );
 }
