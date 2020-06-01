var colorsCod=[{
    R:242,
    G:27,
    B:167
},
{
    R:3, 
    G:76,
    B:140
},
{
    R: 75,
    G:147,
    B:191
},
{
    R:4, 
    G:217,
    B:96
},
{
    R:64,
    G:140,
    B:62
}];

getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

getMilliSecondsPrototype = (time) => {
    res = time.split(" ");
    var hour = 1000*60*60;
    var day = hour*24;
    var month = day*30;
    var year = month*12;
    switch(res[0]){
        case 'h':
            return hour*parseInt(res[1]);
            break;
        case 'd':
            return day*parseInt(res[1]);
            break;
        case 'm':
            return month*parseInt(res[1]);
            break;
        case 'y':
            return year*parseInt(res[1]);
            break;
        default:
            return day*7;
            break;
    }
}

getMilliSeconds = (time) => {

    switch(time){
        case '1 ora':
            return 1000*60*60;
            break;
        case '4 ore':
            return 1000*60*60*4;
            break;
        case '1 zi':
            return 1000*60*60*24;
            break;
        case '2 zile':
            return 
        case '7 zile':
            return 1000*60*60*24*7;
            break;
        case '30 zile':
            return 1000*60*60*24*30;
            break;
        case '90 zile':
            return 1000*60*60*24*90;
            break;
        case '12 luni':
            return 1000*60*60*24*30*12;
            break;
        case '5 ani':
            return 1000*60*60*24*30*12*5;
            break;
        default:
            return 1000*60*60*24*7;
            break;
    }
}

generateTrendingChart = (country,keyword,time) => {
    $.ajax({
        url: "/trends/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time),
        type:"get",
        dataType: "json",
        success: function(data){
            //Here we have the data for trending in generation function
            backColors = [];
            bordColors = [];
            dataPoints = {
                label: [],
                data: []
            }

            for (var i = 0; i < data.length; i++) {
                if(data[i].value[0] == 0 )
                    continue;
        
                dataPoints.label.push(data[i].geoName);
                dataPoints.data.push(data[i].value[0]);

                backColors.push('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+0.3+')');
                bordColors.push('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+1+')');
                // let one=getRandomIntInclusive(0, 255);
                // let two=getRandomIntInclusive(0, 255);
                // let three=getRandomIntInclusive(0, 255);
                // backColors.push('rgba('+one+','+two+','+three+','+0.3+')');
                // bordColors.push('rgba('+one+','+two+','+three+','+1+')');
                //'rgba(255, 99, 132, 0.3)'
            }
            
            var cluster1 = {
                container : 'trendingChart',
                id: 'chart1',
                dataPoints: dataPoints,
                backColors : backColors,
                bordColors : bordColors
            }
            //return cluster1;
            graphs.createTrendingGraph(cluster1);
            //graphs.initialize(cluster1);
        }
    });
    
}

generateInterestOverTimeChart = (country,keyword,time) => {
    $.ajax({
        url: "/interest/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            var array = data.default.timelineData;
            dataPoints = {
                labels: [],
                data: []
            }
            var backgroundColor,borderColor;

            for (var i = 0; i < array.length; i++) {
                if(array[i].value[0] == 0 )
                    continue;
        
                dataPoints.labels.push(array[i].formattedAxisTime);
                dataPoints.data.push(array[i].value[0]);
            }

            
            var cluster = {
                title:`Interest over time in ${$('#countries').val()}`,
                dataPoints: dataPoints,
                backgroundColor:('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+0.3+')'),
                borderColor:('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+1+')')
                // backgroundColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.1+')'),
                // borderColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.3+')')
            }
            graphs.createInterestOverTimeGraph(cluster);
        }
    });

}

generateRelatedTopics = (country,keyword,time) => {
    $.ajax({
        url: "/topics/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            //console.log("These are RELATED TOPICS:");
            //console.log(data.default.rankedList);
        }
    });
}

generateRelatedQueries = (country,keyword,time) => {
    $.ajax({
        url: "/queries/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            //console.log("These are RELATED QUERIES:");
            //console.log(data.default.rankedList);
        }
    });
}

createDictionaryContainerContent = (definitions,examples,pronunciations) => {

    var builder = "";
    var count;
    for(var primaryIndex = 0;   primaryIndex<definitions.length && 
                                primaryIndex<examples.length &&
                                primaryIndex<pronunciations.length; primaryIndex++){
                builder+=`<div class="definition-word-body">
                                <span class="definition-word-category">${   definitions[primaryIndex].lexicalCategory.charAt(0).toUpperCase()+
                                                                            definitions[primaryIndex].lexicalCategory.slice(1)}</span>`;
                count = 1;
        for(var contentIndex = 0;   contentIndex<definitions[primaryIndex].content.length &&
                                    contentIndex<examples[primaryIndex].content.length; contentIndex++){
                    if(definitions[primaryIndex].content[contentIndex]!=null && examples[primaryIndex].content[contentIndex]){    

                builder += `<span class="definition-word-definition" >${count})${definitions[primaryIndex].content[contentIndex].charAt(0).toUpperCase()
                                                                        +definitions[primaryIndex].content[contentIndex].slice(1)}</span>
                            <i><span class="definition-word-example">"${   examples[primaryIndex].content[contentIndex].charAt(0).toUpperCase()+
                                                                        examples[primaryIndex].content[contentIndex].slice(1)}"</span></i>`;
                            count++;
                    }
        }
            builder+=`</div>`
    }
    return builder;
}

insertDictionaryData = (data) => {
    var container = document.getElementsByClassName('search-results-container');
    var htmlTitle = `   <div id="title-dictionary">
                            <span id="title-dictionary-content" >${data.keyword.charAt(0).toUpperCase() + data.keyword.slice(1)}</span>
                            <audio src=${data.pronon[0].entries[0].pronunciations[1].audioFile} controls> Your browser does not support the audio element. </audio>
                            </div>`;
    var definitions = [];
    var examples = [];
    var pronunciations = [];
    console;console.log(data);
    
    if(data.def[0].entries!=null){
        data.def.forEach((primaryItem,primaryIndex)=>{
            definitions[primaryIndex]= {    lexicalCategory:primaryItem.lexicalCategory.text,
                                            content:[] };
            primaryItem.entries[0].senses.forEach((secondaryItem,secondaryIndex)=>{
                if(secondaryItem.definitions!=null)
                    definitions[primaryIndex].content.push(secondaryItem.definitions[0]);
            })
        });
    }
    
    if(data.exem[0].entries!=null){
        data.exem.forEach((primaryItem,primaryIndex)=>{
            examples[primaryIndex]= {   lexicalCategory:primaryItem.lexicalCategory.text,
                                        content:[]  };
            primaryItem.entries[0].senses.forEach((secondaryItem,secondaryIndex)=>{
                if(secondaryItem.examples!=null)
                    examples[primaryIndex].content.push(secondaryItem.examples[0].text)})
        });
    }
    data.pronon.forEach((primaryItem,index)=>{
        pronunciations.push({   phoneticsSpelling:primaryItem.entries[0].pronunciations[0].phoneticSpelling,
                                audioFile:primaryItem.entries[0].pronunciations[1].audioFile})
    });
    var htmlBody = createDictionaryContainerContent(definitions,examples,pronunciations);
    //htmlBody.append=`<audio src=${pronunciations[1].audioFile} controls> Your browser does not support the audio element. </audio>`;

    container[0].innerHTML = htmlTitle + htmlBody; 
}

generateDictionaryTranslation = (keyword) => {
    /*****  Getting dictionary data  *****/
    $.ajax({
        url: "/translate/"+keyword,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            //  Added the dictionary API

            insertDictionaryData(data);
        }
    });
}

initiateData = (country,keyword,time) => {

    generateTrendingChart(country,keyword,time);
    generateInterestOverTimeChart(country,keyword,time);
    generateRelatedTopics(country,keyword,time);
    generateRelatedQueries(country,keyword,time);
    generateDictionaryTranslation(keyword);
}

updateCharts = (country, keyword, time) => {
    /*****  FOR ITRENDING PER STATE  *****/
    //console.log(keyword);

    $.ajax({
        type: 'GET',
        url: '/trends/' + country + "/" + keyword + "/" + getMilliSecondsPrototype(time),
        success: (data) => {
            // console.log("Here we have data from updating function!");
            backColors = [];
            bordColors = [];
            dataPoints = {
                label: [],
                data: []
            }

            for (var i = 0; i < data.length; i++) {
                if(data[i].value[0] == 0 )
                    continue;

                    dataPoints.label.push(data[i].geoName);
                    dataPoints.data.push(data[i].value[0]);

                    backColors.push('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+0.3+')');
                    bordColors.push('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+1+')');

                // dataPoints.label.push(data[i].geoName);
                // dataPoints.data.push(data[i].value[0]);
                // let one=getRandomIntInclusive(0, 255);
                // let two=getRandomIntInclusive(0, 255);
                // let three=getRandomIntInclusive(0, 255);
                // backColors.push('rgba('+one+','+two+','+three+','+0.3+')');
                // bordColors.push('rgba('+one+','+two+','+three+','+1+')');
                //'rgba(255, 99, 132, 0.3)'
            }
            
            var cluster1 = {
                container : 'trendingChart',
                id: 'chart1',
                dataPoints: dataPoints,
                backColors : backColors,
                bordColors : bordColors
            }
            graphs.updateTrendingChart(cluster1);
        },
        dataType: 'JSON'
    });
    /*****  FOR INTEREST OVER TIME  *****/
    $.ajax({
        type: 'GET',
        url: "/interest/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        dataType: 'JSON',
        success: (data) => {
            var array = data.default.timelineData;
            dataPoints = {
                labels: [],
                data: []
            }

            for (var i = 0; i < array.length; i++) {
                if(array[i].value[0] == 0 )
                    continue;
        
                dataPoints.labels.push(array[i].formattedAxisTime);
                dataPoints.data.push(array[i].value[0]);
            }


            var cluster = {
                title:`Interest over time in ${country}`,
                dataPoints: dataPoints,
                backgroundColor:('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+0.3+')'),
                borderColor:('rgba('+colorsCod[i%5].R+','+colorsCod[i%5].G+','+colorsCod[i%5].B+','+1+')')
                // backgroundColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.1+')'),
                // borderColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.3+')')
            }
            graphs.updateInterestOverTimeGraph(cluster);
        },
    });
    /*****  Getting RELATED QUERIES  *****/
    $.ajax({
        url: "/queries/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            //console.log("These are RELATED QUERIES UPDATED:");
            //console.log(data.default.rankedList);
        }
    });
    /*****  Getting RELATED TOPICS  *****/
    $.ajax({
        url: "/topics/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            //console.log("These are RELATED TOPICS UPDATED:");
            //console.log(data.default.rankedList);
        }
    });
    /*****  Getting dictionary data  *****/
    $.ajax({
        url: "/translate/"+keyword,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            console.log(data);
            insertDictionaryData(data);
        }
    });
}

handleSearch = () => {
    var selected_country = $('#countries').val();
    var keyword = $('#keyInput').val();
    var time = $('#time').val();
    if(selected_country.length>0 && keyword.length>0 && time.length>0)
        updateCharts(selected_country,keyword,time);
}

searchBySuggestions = (value) => {
    var keyword = value[0].children[0].textContent;
    $('#keyInput').val(keyword);
    $('.suggestion').remove();
    handleSearch();
}

generateSuggestions = (data) => {

    $('.suggestion').remove();

    var html = data.map((val,index) => {
        return `<div class='card card-body suggestion' onclick='searchBySuggestions($(this))'>
                    <span style='margin-bottom:5px;'>${val.title}</span>
                    <span style='color:rgba(0,0,0,0.54);'>${val.type}</span>
                </div>`
    });
    html.forEach((val,index)=>{
        $('#suggestion-bar').append(val);
    });
}

inputData = () =>{
    var keyword = $('#keyInput').val();
    $('.suggestion').remove();
    if(keyword.length>0){
        $.ajax({
            url:'/typing/'+keyword,
            type:'GET',
            dataType:'JSON',
            success: (data) => {
                generateSuggestions(data.default.topics);
            }
        });
    } 
        
    
}

/***    In home page     */

searchBySuggestionsHome = (value) => {
    var keyword = value[0].children[0].textContent;
    $('#keyInputHome').val(keyword);
    $('.suggestion').remove();
    $('.search').submit();
}

generateSuggestionsHome = (data) => {
    $('.suggestion').remove();

    var html = data.map((val,index) => {
        return `<div class='card card-body suggestion' onclick='searchBySuggestionsHome($(this))' style='width:100%;margin-left:0px;margin-right:0px;'>
                    <span style='margin-bottom:5px;'>${val.title}</span>
                    <span style='color:rgba(0,0,0,0.54);'>${val.type}</span>
                </div>`
    });
    html.forEach((val,index)=>{
        $('#suggestion-bar').append(val);
    });
}

inputDataHome = () =>{
    var keyword = $('#keyInputHome').val();
    $('.suggestion').remove();
    if(keyword.length>0){
        $.ajax({
            url:'/typing/'+keyword,
            type:'GET',
            dataType:'JSON',
            success: (data) => {
                generateSuggestionsHome(data.default.topics);
            }
        });
    } 
        
    

}


$(document).ready(()=>{

    $("#keyInput").on('keyup', function (e) {
        if (e.keyCode === 13) {
            handleSearch();
        }
    });


    $('#countries').change( () => {
        handleSearch();
    });

    $('#time').change( () => {
        handleSearch();
    });

    $('html').click(function(e) {                    
        if(!$(e.target).hasClass('search-control') )
        {
            $('.suggestion').remove();                
        }
    }); 

    $('#keyInput').focusin( ()=>{
        //$('#keyInput').attr("style","border-bottom-right-radius:0px;border-bottom-left-radius:0px;");
        inputData();
    });

    $('#keyInputHome').focusin( ()=>{
        //$('#keyInput').attr("style","border-bottom-right-radius:0px;border-bottom-left-radius:0px;");
        inputDataHome();
    });
});