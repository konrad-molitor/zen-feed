module.exports = `
<div dir="ltr" style="text-align: left;" trbidi="on">
<iframe width="1280" height="720" src="https://www.youtube.com/embed/TtZ1Mk3-vlQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="1280" height="720" src="https://google.com" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<div class="separator" style="clear: both; text-align: center;">
<a href="https://4.bp.blogspot.com/-pSUzpv74_Ks/V2lnAVjr4fI/AAAAAAAAEh4/4PKG6IasX6knYIdTZc2y98HlIxXUXEyxgCLcB/s1600/9c29dc2a2609311cc4b67c095172d3ea.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="203" width="400" src="https://4.bp.blogspot.com/-pSUzpv74_Ks/V2lnAVjr4fI/AAAAAAAAEh4/4PKG6IasX6knYIdTZc2y98HlIxXUXEyxgCLcB/s400/9c29dc2a2609311cc4b67c095172d3ea.png"></a></div>
<div style="text-align: right;">
<br></div>
<h3 style="text-align: left;">
Пользователи и программы</h3>
<div>
Пользователи - ужасные существа. Серьёзно. Они постоянно пытаются сделать что-то ужасное. По незнанию, а то и вовсе из вредности. Не доверяйте пользователям. Ибо всё, что они могут сделать плохого, они обязательно сделают.</div>
<div>
Теперь выдохнули.</div>
<div>
<br></div>
<h3 style="text-align: left;">
Проблема</h3>
<div>
Представим, что у нас есть сайт с back-end'ом на Node.JS. И мы (о, ужас!) разрешаем пользователям размещать на этом сайте свой контент, в том числе и в виде форматированного текста. Форматирование текста в Web, если кто-то забыл, осуществляется с помощью гипертекстового языка разметки (больше известного как HTML). Теперь взглянем на проблему "в поле".</div>
<div>
<br></div>
<h3 style="text-align: left;">
Имитируем back-end</h3>
<div>
Напишем простой сервер, который принимает от пользователя текстовые данные и тут же возвращает их ему самому для просмотра. Для большей наглядности я даже не стану использовать Postman и curl в качестве фронт-энда.</div>
<div>
<br></div>
<div>
Итак, простой сервер:</div>
<div>
<br>
<b>server.js</b><br>
<b><br></b></div>
<pre style="background: #fdf6e3; color: #586e75;"><span style="color: #268bd2;">var</span> express <span style="color: #859900;">=</span> require(<span style="color: #269186;"><span style="color: #c60000;">'</span>express<span style="color: #c60000;">'</span></span>)
<span style="color: #268bd2;">var</span> app <span style="color: #859900;">=</span> express()

<span style="color: #268bd2;">var</span> bodyParser <span style="color: #859900;">=</span> require(<span style="color: #269186;"><span style="color: #c60000;">'</span>body-parser<span style="color: #c60000;">'</span></span>)

app.use(bodyParser.json())

<span style="color: #859900;">/</span><span style="color: #859900;">*</span><span style="color: #859900;">*</span>
 <span style="color: #859900;">*</span> <span style="color: #268bd2;">Этот</span> <span style="color: #268bd2;">модуль</span> <span style="color: #268bd2;">можно</span> <span style="color: #268bd2;">использовать</span> <span style="color: #268bd2;">в</span> <span style="color: #268bd2;">качестве</span> <span style="color: #268bd2;">сервера</span> <span style="color: #268bd2;">статического</span> <span style="color: #268bd2;">контента</span>,
 <span style="color: #859900;">*</span> <span style="color: #268bd2;">например</span>, <span style="color: #268bd2;">файлов</span> <span style="color: #268bd2;">html</span>, <span style="color: #268bd2;">картинок</span>, <span style="color: #268bd2;">css</span> <span style="color: #268bd2;">и</span> <span style="color: #268bd2;">прочего</span>.
 <span style="color: #859900;">*</span> <span style="color: #268bd2;">Но</span> <span style="color: #268bd2;">не</span> <span style="color: #268bd2;">стоит</span>. <span style="color: #268bd2;">Какой</span><span style="color: #859900;">-</span><span style="color: #268bd2;">нибудь</span> <span style="color: #268bd2;">nginx</span> <span style="color: #268bd2;">с</span> <span style="color: #268bd2;">этим</span> <span style="color: #268bd2;">справится</span> <span style="color: #268bd2;">гораздо</span> <span style="color: #268bd2;">лучше</span> <span style="color: #268bd2;">и</span> <span style="color: #268bd2;">быстрее</span>.
 <span style="color: #859900;">*</span> <span style="color: #268bd2;">Используйте</span> <span style="color: #268bd2;">его</span> <span style="color: #268bd2;">только</span> <span style="color: #268bd2;">в</span> <span style="color: #268bd2;">целях</span> <span style="color: #268bd2;">разработки</span>.
 <span style="color: #859900;">*</span> <span style="color: #268bd2;">В</span> <span style="color: #268bd2;">данном</span> <span style="color: #268bd2;">случае</span>, <span style="color: #268bd2;">он</span> <span style="color: #268bd2;">будет</span> <span style="color: #268bd2;">искать</span> <span style="color: #268bd2;">файлы</span> <span style="color: #268bd2;">в</span> <span style="color: #268bd2;">папке</span> <span style="color: #268bd2;">static</span>.
 <span style="color: #859900;">*</span> <span style="color: #268bd2;">Например</span>, <span style="color: #268bd2;">в</span> <span style="color: #268bd2;">ответ</span> <span style="color: #268bd2;">на</span> <span style="color: #268bd2;">запрос</span> <span style="color: #268bd2;">http</span><span style="color: #859900;">:</span><span style="color: #859900;">/</span><span style="color: #859900;">/</span><span style="color: #859900;">...</span><span style="color: #859900;">/</span><span style="color: #268bd2;">somefile.file</span>
 <span style="color: #859900;">*</span> <span style="color: #268bd2;">будет</span> <span style="color: #268bd2;">выслан</span> <span style="color: #268bd2;">файл</span> <span style="color: #859900;">/</span><span style="color: #268bd2;">static</span><span style="color: #859900;">/</span><span style="color: #268bd2;">somefile.file</span> 
 <span style="color: #859900;">*</span><span style="color: #859900;">/</span>
app.use(express.static(<span style="color: #269186;"><span style="color: #c60000;">'</span>static<span style="color: #c60000;">'</span></span>))

app.use(<span style="color: #269186;"><span style="color: #c60000;">'</span>/api<span style="color: #c60000;">'</span></span>, require(<span style="color: #269186;"><span style="color: #c60000;">'</span>./api<span style="color: #c60000;">'</span></span>))

<span style="color: #268bd2;">var</span> server <span style="color: #859900;">=</span> app.listen( <span style="color: #268bd2;">process.env.PORT</span> <span style="color: #859900;">||</span> <span style="color: #d33682;">3000</span>, <span style="color: #859900;">function</span>(){
    console.log(<span style="color: #269186;"><span style="color: #c60000;">'</span>Server up and running on port %d<span style="color: #c60000;">'</span></span>, server.address().<span style="color: #268bd2;">port</span>)
})
</pre>
<div>
<br></div>
<div>
<b>/api/index.js</b><br>
<b><br></b></div>
<pre style="background: #fdf6e3; color: #586e75;"><span style="color: #93a1a1;">// импортируем роутер</span>
<span style="color: #268bd2;">var</span> router <span style="color: #859900;">=</span> require<span style="color: #93a1a1;">(</span><span style="color: #269186;"><span style="color: #c60000;">'</span>express<span style="color: #c60000;">'</span></span><span style="color: #93a1a1;">)</span>.Router<span style="color: #93a1a1;">(</span><span style="color: #93a1a1;">)</span>
<span style="color: #93a1a1;">// а эту переменную будем использовать вместо "базы данных"</span>
<span style="color: #93a1a1;">// в реальном приложении, конечно, данные будут запрашиваться из БД</span>
<span style="color: #268bd2;">var</span> postData; 

<span style="color: #93a1a1;">/* этот метод просто извлекает из тела запроса параметр body
 * и присваевает его значение переменной postData
 */</span>
router.post<span style="color: #93a1a1;">(</span><span style="color: #269186;"><span style="color: #c60000;">'</span>/<span style="color: #c60000;">'</span></span>, <span style="color: #a57800;"><span style="color: #268bd2;">function</span> <span style="color: #93a1a1;">(</span>req, res, next)</span> <span style="color: #268bd2;">{</span>
    postData <span style="color: #859900;">=</span> req.body.body;
    res.sendStatus<span style="color: #93a1a1;">(</span><span style="color: #269186;">201</span><span style="color: #93a1a1;">)</span>
<span style="color: #268bd2;">}</span><span style="color: #93a1a1;">)</span>

<span style="color: #93a1a1;">/**
 * этот метод просто возвращает данные из переменной postData, 
 * если в ней что-то есть. Если нет - возвращает 404.
 */</span>
router.get<span style="color: #93a1a1;">(</span><span style="color: #269186;"><span style="color: #c60000;">'</span>/<span style="color: #c60000;">'</span></span>, <span style="color: #a57800;"><span style="color: #268bd2;">function</span> <span style="color: #93a1a1;">(</span>req, res, next)</span> <span style="color: #268bd2;">{</span>
    <span style="color: #859900;">if</span> <span style="color: #93a1a1;">(</span>postData<span style="color: #93a1a1;">)</span><span style="color: #268bd2;">{</span>
        res.<span style="color: #268bd2;">send</span><span style="color: #93a1a1;">(</span>postData<span style="color: #93a1a1;">)</span>
    <span style="color: #268bd2;">}</span> <span style="color: #859900;">else</span> <span style="color: #268bd2;">{</span>
        res.sendStatus<span style="color: #93a1a1;">(</span><span style="color: #269186;">404</span><span style="color: #93a1a1;">)</span>
    <span style="color: #268bd2;">}</span>
<span style="color: #268bd2;">}</span><span style="color: #93a1a1;">)</span>

module.exports <span style="color: #859900;">=</span> router
</pre>
<br>
Ну и моя печаль и беда - фронт-энд.<br>
<br>
<b>/static/index.html</b><br>
<b><br></b>
<br>
<pre style="background: #fdf6e3; color: #586e75;"><span style="color: #899090; font-style: italic;"><span style="color: #93a1a1;">&lt;!</span><span style="color: #899090; font-style: italic;">DOCTYPE</span> html<span style="color: #93a1a1;">&gt;</span></span>
<span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">html</span> <span style="color: #93a1a1;">lang</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>ru<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
    <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">head</span><span style="color: #93a1a1;">&gt;</span>
        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">title</span><span style="color: #93a1a1;">&gt;</span>User content example<span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">title</span><span style="color: #93a1a1;">&gt;</span>
        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">meta</span> <span style="color: #93a1a1;">charset</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>UTF-8<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">meta</span> <span style="color: #93a1a1;">name</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>viewport<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">content</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>width=device-width, initial-scale=1.0, minimum-scale=1.0<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">link</span> <span style="color: #93a1a1;">rel</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>stylesheet<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">href</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>https://fonts.googleapis.com/icon?family=Material+Icons<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">link</span> <span style="color: #93a1a1;">rel</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>stylesheet<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">href</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>https://code.getmdl.io/1.1.3/material.amber-yellow.min.css<span style="color: #269186;">"</span></span><span style="color: #93a1a1;"> /&gt;</span>
        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">link</span> <span style="color: #93a1a1;">rel</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>stylesheet<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">href</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>style.css<span style="color: #269186;">"</span></span>
    &lt;/<span style="color: #93a1a1;">head</span><span style="color: #93a1a1;">&gt;</span>
    <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">body</span> <span style="color: #93a1a1;">ng-app</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>app<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">div</span> <span style="color: #93a1a1;">ng-controller</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>MainController<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>page-main mdl-layout mdl-js-layout mdl-color--grey-100 is-small-screen<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
            <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">div</span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>main mdl-layout-content<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
                <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">div</span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>card mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
                    <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">div</span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>textareaholder mdl-textfield mdl-js-textfield<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
                        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">textarea</span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>userinput mdl-textfield__input<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">id</span><span style="color: #708284;">=</span><span style="color: #269186;"><span style="color: #269186;">"</span>userinput<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">type</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>text<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">rows</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>5<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">ng-model</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>userinput<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;&lt;/</span><span style="color: #268bd2; font-weight: 700;">textarea</span><span style="color: #93a1a1;">&gt;</span>
                        <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">label</span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>mdl-textfield__label<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">for</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>userinput<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>Введите HTML здесь...<span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">label</span><span style="color: #93a1a1;">&gt;</span>  
                    <span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">div</span><span style="color: #93a1a1;">&gt;</span>
                    <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">button</span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>mdl-button mdl-js-button mdl-button--raised mdl-button--accent<span style="color: #269186;">"</span></span> <span style="color: #93a1a1;">ng-click</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>send()<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>Отправить<span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">button</span><span style="color: #93a1a1;">&gt;</span>
                <span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">div</span><span style="color: #93a1a1;">&gt;</span>
                <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">div</span> <span style="color: #93a1a1;">class</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>card mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span>
                    <span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">p</span><span style="color: #93a1a1;">&gt;</span><span style="color: #93a1a1;">&lt;</span><span style="color: #268bd2; font-weight: 700;">div</span> <span style="color: #93a1a1;">ng-bind-html</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>servedContent<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;&lt;/</span><span style="color: #268bd2; font-weight: 700;">div</span><span style="color: #93a1a1;">&gt;</span><span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">p</span><span style="color: #93a1a1;">&gt;</span>
                <span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">div</span><span style="color: #93a1a1;">&gt;</span>
            <span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">div</span><span style="color: #93a1a1;">&gt;</span>
        <span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">div</span><span style="color: #93a1a1;">&gt;</span>        
    <span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">body</span><span style="color: #93a1a1;">&gt;</span>
    <span style="color: #93a1a1;">&lt;</span><span style="font-style: italic;">script</span> <span style="color: #93a1a1;">defer</span> <span style="color: #93a1a1;">src</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>https://code.getmdl.io/1.1.3/material.min.js<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span><span style="color: #93a1a1;">&lt;/</span><span style="font-style: italic;">script</span><span style="color: #93a1a1;">&gt;</span>
    <span style="color: #93a1a1;">&lt;</span><span style="font-style: italic;">script</span> <span style="color: #93a1a1;">src</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span><span style="color: #93a1a1;">&lt;/</span><span style="font-style: italic;">script</span><span style="color: #93a1a1;">&gt;</span>
    <span style="color: #93a1a1;">&lt;</span><span style="font-style: italic;">script</span> <span style="color: #93a1a1;">src</span>=<span style="color: #269186;"><span style="color: #269186;">"</span>app.js<span style="color: #269186;">"</span></span><span style="color: #93a1a1;">&gt;</span><span style="color: #93a1a1;">&lt;/</span><span style="font-style: italic;">script</span><span style="color: #93a1a1;">&gt;</span>
<span style="color: #93a1a1;">&lt;/</span><span style="color: #268bd2; font-weight: 700;">html</span><span style="color: #93a1a1;">&gt;</span>
</pre>
<br>
<b>/static/app.js</b><br>
<b><br></b>
<br>
<pre style="background: #fdf6e3; color: #586e75;">angular.module<span style="color: #93a1a1;">(</span><span style="color: #269186;"><span style="color: #c60000;">'</span>app<span style="color: #c60000;">'</span></span>, <span style="color: #268bd2;">[</span><span style="color: #268bd2;">]</span><span style="color: #93a1a1;">)</span>
.controller<span style="color: #93a1a1;">(</span><span style="color: #269186;"><span style="color: #c60000;">'</span>MainController<span style="color: #c60000;">'</span></span>, 
<span style="color: #268bd2;">[</span>
    <span style="color: #269186;"><span style="color: #c60000;">'</span>$scope<span style="color: #c60000;">'</span></span>, 
    <span style="color: #269186;"><span style="color: #c60000;">'</span>$http<span style="color: #c60000;">'</span></span>, 
    <span style="color: #269186;"><span style="color: #c60000;">'</span>$sce<span style="color: #c60000;">'</span></span>, 
    <span style="color: #a57800;"><span style="color: #268bd2;">function</span> <span style="color: #93a1a1;">(</span>$scope, $http, $sce)</span> <span style="color: #268bd2;">{</span>
    <span style="color: #859900;">$</span>scope.userinput <span style="color: #859900;">=</span> <span style="color: #b58900;">null</span>;
    <span style="color: #859900;">$</span>scope.servedContent <span style="color: #859900;">=</span> <span style="color: #b58900;">null</span>;
    <span style="color: #93a1a1;">/**
     * Эта функция контроллёра привязана к ng-click единственной кнопки.
     * Она отправляет запрос типа POST с введёнными данными из textarea
     * и сразу же отправляет запрос GET, получая данные для ng-bind-html
     */</span>
    <span style="color: #a57800;"><span style="color: #859900;">$scope</span>.<span style="color: #a57800;">send</span> <span style="color: #859900;">=</span> <span style="color: #268bd2;">function</span>()</span> <span style="color: #268bd2;">{</span>
        <span style="color: #859900;">if</span> <span style="color: #93a1a1;">(</span><span style="color: #859900;">$</span>scope.userinput<span style="color: #93a1a1;">)</span><span style="color: #268bd2;">{</span>
            post <span style="color: #859900;">=</span> <span style="color: #268bd2;">{</span> body: <span style="color: #859900;">$</span>scope.userinput<span style="color: #268bd2;">}</span>;
            <span style="color: #268bd2;">var</span> postReq <span style="color: #859900;">=</span> <span style="color: #268bd2;">{</span>
                method: <span style="color: #269186;"><span style="color: #c60000;">'</span>POST<span style="color: #c60000;">'</span></span>,
                url: <span style="color: #269186;"><span style="color: #c60000;">'</span>http://localhost:3000/api/<span style="color: #c60000;">'</span></span>,
                data: post
            <span style="color: #268bd2;">}</span>
            <span style="color: #859900;">$</span>http<span style="color: #93a1a1;">(</span>postReq<span style="color: #93a1a1;">)</span>
            <span style="color: #268bd2;">var</span> getReq <span style="color: #859900;">=</span> <span style="color: #268bd2;">{</span>
                method: <span style="color: #269186;"><span style="color: #c60000;">'</span>GET<span style="color: #c60000;">'</span></span>,
                url: <span style="color: #269186;"><span style="color: #c60000;">'</span>http://localhost:3000/api/<span style="color: #c60000;">'</span></span>
            <span style="color: #268bd2;">}</span>
            <span style="color: #859900;">$</span>http<span style="color: #93a1a1;">(</span>getReq<span style="color: #93a1a1;">)</span>.then<span style="color: #93a1a1;">(</span><span style="color: #a57800;"><span style="color: #268bd2;">function</span> <span style="color: #93a1a1;">(</span>response)</span> <span style="color: #268bd2;">{</span>
                console<span style="color: #268bd2;">.log</span><span style="color: #93a1a1;">(</span><span style="color: #859900;">$</span>scope.servedContent<span style="color: #93a1a1;">)</span>
                <span style="color: #93a1a1;">/**
                 * Обратите внимание на функцию $sce.trustAsHtml, которой мы передаём
                 * полученные от сервера данные. Без этой функции сервис Strict Contextual
                 * Escaping не даст встраивать какой попало HTML-код в документ в целях
                 * безопасности.
                 */</span>
                <span style="color: #859900;">$</span>scope.servedContent <span style="color: #859900;">=</span><span style="color: #859900;">$</span>sce.trustAsHtml<span style="color: #93a1a1;">(</span>response.data<span style="color: #93a1a1;">)</span>;
            <span style="color: #268bd2;">}</span><span style="color: #93a1a1;">)</span>
        <span style="color: #268bd2;">}</span>
    <span style="color: #268bd2;">}</span>
<span style="color: #268bd2;">}</span><span style="color: #268bd2;">]</span><span style="color: #93a1a1;">)</span>
</pre>
<b><br></b><b>/static/style.css</b><br>
<b><br></b>
<br>
<pre style="background: #fdf6e3; color: #586e75;"><span style="color: #536871;"><span style="color: #268bd2;">.main</span> </span><span style="color: #5a74cf;">{</span>
    <span style="color: #a57800;"><span style="color: #a57800;">margin</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> <span style="color: #269186;">3<span style="color: #859900;">%</span></span><span style="color: #536871;">;</span></span>
    <span style="color: #a57800;"><span style="color: #a57800;">height</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> <span style="color: #269186;">100</span>vh<span style="color: #536871;">;</span></span>
}
<span style="color: #536871;"><span style="color: #268bd2;">.card</span> </span><span style="color: #5a74cf;">{</span>
    <span style="color: #a57800;"><span style="color: #a57800;">border-radius</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> <span style="color: #269186;">1<span style="color: #859900;">%</span></span><span style="color: #536871;">;</span></span>
    <span style="color: #a57800;"><span style="color: #a57800;">min-height</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> <span style="color: #269186;">45</span>vh<span style="color: #536871;">;</span></span>
    <span style="color: #a57800;"><span style="color: #a57800;">padding</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> <span style="color: #269186;">3<span style="color: #859900;">%</span></span><span style="color: #536871;">;</span></span>
    <span style="color: #a57800;">align-<span style="color: #a57800;">content</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> center<span style="color: #536871;">;</span></span>
}
<span style="color: #536871;"><span style="color: #268bd2;">.textareaholder</span> </span><span style="color: #5a74cf;">{</span>
    <span style="color: #a57800;"><span style="color: #a57800;">height</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> inherit<span style="color: #536871;">;</span></span>
    <span style="color: #a57800;"><span style="color: #a57800;">width</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> inherit<span style="color: #536871;">;</span></span>
    <span style="color: #a57800;">align-<span style="color: #a57800;">content</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> center<span style="color: #536871;">;</span></span>
}
<span style="color: #536871;"><span style="color: #268bd2;">.userinput</span> </span><span style="color: #5a74cf;">{</span>
    <span style="color: #a57800;"><span style="color: #a57800;">width</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> inherit<span style="color: #536871;">;</span></span>
    <span style="color: #a57800;"><span style="color: #a57800;">height</span></span><span style="color: #269186;"><span style="color: #536871;">:</span> inherit<span style="color: #536871;">;</span></span>
}
</pre>
<br>
Запустим сервер и перейдём на http://localhost:3000.<br>
<br>
<div class="separator" style="clear: both; text-align: center;">
<a href="https://2.bp.blogspot.com/-M1GzbPv1X5k/V2lrW8l-KkI/AAAAAAAAEiE/Qchk45cYcSghl8H84D_xP3scZmfJFGJQACLcB/s1600/initial.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="344" width="640" src="https://2.bp.blogspot.com/-M1GzbPv1X5k/V2lrW8l-KkI/AAAAAAAAEiE/Qchk45cYcSghl8H84D_xP3scZmfJFGJQACLcB/s640/initial.png" class="" style="display: inline-block;"></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br></div>
<div class="separator" style="clear: both; text-align: left;">
Итак, с одной стороны всё хорошо.</div>
<div class="separator" style="clear: both; text-align: left;">
<br></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="https://2.bp.blogspot.com/-DWdSYJcPDuY/V2lsR1OQD5I/AAAAAAAAEiQ/uuI-z_XhrFUSKt45aGEuXyJSoyJpw5KwACLcB/s1600/sample.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="325" width="400" src="https://2.bp.blogspot.com/-DWdSYJcPDuY/V2lsR1OQD5I/AAAAAAAAEiQ/uuI-z_XhrFUSKt45aGEuXyJSoyJpw5KwACLcB/s400/sample.png" class="" style="display: inline-block;"></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br></div>
<div class="separator" style="clear: both; text-align: left;">
Форматирование есть, картинки вставляются. Что ещё нужно для счастья?</div>
<div class="separator" style="clear: both; text-align: left;">
Но вот это вот совсем нехорошо:</div>
<div class="separator" style="clear: both; text-align: left;">
<br></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="https://2.bp.blogspot.com/-GOLhIB6sws0/V2ls_i0QrOI/AAAAAAAAEic/ssdGN7D04ZUxKZu6tMkyZJW-aRHHhn2aACLcB/s1600/script.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="271" width="400" src="https://2.bp.blogspot.com/-GOLhIB6sws0/V2ls_i0QrOI/AAAAAAAAEic/ssdGN7D04ZUxKZu6tMkyZJW-aRHHhn2aACLcB/s400/script.png" class="" style="display: inline-block;"></a></div>
<div class="separator" style="clear: both; text-align: left;">
<br></div>
Думаю, объяснять, почему именно - не стоит.<br>
Опытные товарищи тут же ощетинятся кучей регулярных выражений и (вместо одной проблемы у них будет две, да) выкорчуют все теги из полученной от пользователя строки. Однако имеется и более элегантное решение (экономящее кучу времени на написание регулярок, хаха), а именно - модуль sanitize-html (<a href="https://www.npmjs.com/package/sanitize-html">https://www.npmjs.com/package/sanitize-html</a>).<br>
<br>
Немного изменим /api/index.js<br>
<br>
<pre style="background: #fdf6e3; color: #586e75;"><span style="color: #93a1a1;">// импортируем sanitize-html</span>
<span style="color: #268bd2;">var</span> sanitize <span style="color: #859900;">=</span> require<span style="color: #93a1a1;">(</span><span style="color: #269186;"><span style="color: #c60000;">'</span>sanitize-html<span style="color: #c60000;">'</span></span><span style="color: #93a1a1;">)</span>

<span style="color: #93a1a1;">// а эту переменную будем использовать вместо "базы данных"</span>
<span style="color: #93a1a1;">// в реальном приложении, конечно, данные будут запрашиваться из БД</span>
<span style="color: #268bd2;">var</span> postData; 

<span style="color: #93a1a1;">/* этот метод просто извлекает из тела запроса параметр body
 * и присваевает его значение переменной postData
 */</span>
router.post<span style="color: #93a1a1;">(</span><span style="color: #269186;"><span style="color: #c60000;">'</span>/<span style="color: #c60000;">'</span></span>, <span style="color: #a57800;"><span style="color: #268bd2;">function</span> <span style="color: #93a1a1;">(</span>req, res, next)</span> <span style="color: #268bd2;">{</span>
    postData <span style="color: #859900;">=</span> sanitize<span style="color: #93a1a1;">(</span>req.body.body, <span style="color: #268bd2;">{</span>
        <span style="color: #93a1a1;">// в этом объекте можно указать, какие теги разрешены</span>
        allowedTags: <span style="color: #268bd2;">[</span><span style="color: #269186;"><span style="color: #c60000;">'</span>b<span style="color: #c60000;">'</span></span>, <span style="color: #269186;"><span style="color: #c60000;">'</span>i<span style="color: #c60000;">'</span></span>, <span style="color: #269186;"><span style="color: #c60000;">'</span>em<span style="color: #c60000;">'</span></span>, <span style="color: #269186;"><span style="color: #c60000;">'</span>strong<span style="color: #c60000;">'</span></span>, <span style="color: #269186;"><span style="color: #c60000;">'</span>ol<span style="color: #c60000;">'</span></span>, <span style="color: #269186;"><span style="color: #c60000;">'</span>ul<span style="color: #c60000;">'</span></span>, <span style="color: #269186;"><span style="color: #c60000;">'</span>li<span style="color: #c60000;">'</span></span>, <span style="color: #269186;"><span style="color: #c60000;">'</span>a<span style="color: #c60000;">'</span></span><span style="color: #268bd2;">]</span>,
        <span style="color: #93a1a1;">// здесь задаём разрешённые аттрибуты тегов. </span>
        <span style="color: #93a1a1;">// пустой массив запретит все аттрибуты.</span>
        allowedAttributes: <span style="color: #268bd2;">[</span><span style="color: #268bd2;">]</span>,
        <span style="color: #93a1a1;">// мы не хотим ссылки, но текст - оставим</span>
        transformTags: <span style="color: #268bd2;">{</span>
            <span style="color: #269186;"><span style="color: #c60000;">'</span><span style="color: #a57800;">a</span><span style="color: #c60000;">'</span></span>: <span style="color: #a57800;">function</span>(tagName, attribs)<span style="color: #268bd2;">{</span>
                <span style="color: #93a1a1;">// здесь можно написать свою собственную функцию</span>
                <span style="color: #859900;">return</span> <span style="color: #268bd2;">{</span>
                    tagName: <span style="color: #269186;"><span style="color: #c60000;">'</span>b<span style="color: #c60000;">'</span></span>
                <span style="color: #268bd2;">}</span>
            <span style="color: #268bd2;">}</span>
        <span style="color: #268bd2;">}</span>
    <span style="color: #268bd2;">}</span><span style="color: #93a1a1;">)</span>;
    res.sendStatus<span style="color: #93a1a1;">(</span><span style="color: #269186;">201</span><span style="color: #93a1a1;">)</span>
<span style="color: #268bd2;">}</span><span style="color: #93a1a1;">)</span>
</pre>
<br>
Перезапустим сервер и взглянем на результат.<br>
<br>
<div class="separator" style="clear: both; text-align: center;">
<a href="https://4.bp.blogspot.com/-0KEHo9uKfSk/V2lywDXc7zI/AAAAAAAAEis/0cdKoluW9YoM53KP9Giu9mC8q3oXmfu7wCLcB/s1600/sanitized.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="341" width="400" src="https://4.bp.blogspot.com/-0KEHo9uKfSk/V2lywDXc7zI/AAAAAAAAEis/0cdKoluW9YoM53KP9Giu9mC8q3oXmfu7wCLcB/s400/sanitized.png" class="" style="display: inline-block;"></a></div>
<div class="separator" style="clear: both; text-align: left;">
Теперь всё в порядке.</div>
<div class="separator" style="clear: both; text-align: left;">
Исходный код проекта доступен на github:</div>
<div class="separator" style="clear: both; text-align: left;">
<a href="https://github.com/konrad-molitor/user-content-safety">https://github.com/konrad-molitor/user-content-safety</a></div>
<div class="separator" style="clear: both; text-align: left;">
<a href="https://github.com/konrad-molitor/user-content-safety.git">https://github.com/konrad-molitor/user-content-safety.git</a></div>
</div>

`