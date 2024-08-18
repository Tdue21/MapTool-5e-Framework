

[h: MaxLen=getStrProp(macro.args,"MaxLen")]
[h: MaxValue=getStrProp(macro.args,"MaxValue")]
[h: Value=getStrProp(macro.args,"Value")]
[h: Color=getStrProp(macro.args,"Color")]
[h: Len=max(min(round(Value*MaxLen/MaxValue+0.4999),MaxLen),0)]


<table>
  <tr>
    <td style="background-color: [r:Color]">
      <span title="{Value}/{MaxValue}">[c(Len, ""),r: "&nbsp;"]</span>
    </td>
    [if(MaxLen-Len>0), code: {
      <td style="background-color: silver">
        <span title="{Value}/{MaxValue}">[c(MaxLen-Len,""),r: "&nbsp;"]</span>
      </td>
    };{}]
  </tr>
</table>