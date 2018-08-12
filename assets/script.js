var width = 600,
	height = 300,
	margin = 50;


var companyList = [
	{name: 'Samsung', units:'317.2', logo:'samsung'},
	{name: 'Apple', units: '215.4', logo:'apple'},
	{name: 'Huawei', units: '153.0', logo:'huawei'},
	{name: 'Oppo', units: '116.7', logo:'oppo'},
	{name: 'Vivo', units:'96.3', logo:'vivo'},
	{name: 'Xiaomi', units: '92.5', logo:'xiaomi'},
	{name: 'LG', units: '55.0', logo:'lg'},
	{name: 'ZTE', units: '54.7', logo:'zte'},
	{name: 'Lenovo', units: '39.6', logo:'lenovo'},
	{name: 'Gionee', units: '39', logo:'gionee'},
	{name: 'Other', units: '326.1'},

];


var spacing = height/companyList.length;
//Axis/scale
var xScale = d3.scaleLinear()
			.domain([0,400])
			.range([0,width]);

var xAxisGen = d3.axisBottom(xScale).ticks(7);


//Colour Generator
var colGen = d3.scaleLinear()
			.domain([0,10])
			.range(['steelblue','lightsteelblue'])


//Chart
var chart = d3.select('.chart')
			.attr('viewBox','0 0 '+(width+margin*2)+' '+(height+margin*2))
			.append('g')
			.attr('transform','translate('+margin+','+margin+')')


//External images
// chart.append('image')
// 		.attr('xlink:href','assets/images/samsung-logo.png')
// 		.attr('width',50)
// 		.attr('height',50)
// 		.attr('y',spacing-30)
// 		.attr('x',-55)

// chart.append('image')
// 		.attr('xlink:href','assets/images/apple-logo.png')
// 		.attr('width',20)
// 		.attr('height',20)
// 		.attr('y',spacing+10)
// 		.attr('x',-55)

//Bar groups
var barGroups = chart.selectAll('g')
					.data(companyList)
					.enter()
					.append('g')
					.attr('transform',(d,i)=>'translate(0,'+i*spacing+')')

barGroups.append('g')
		.append('image')
		.attr('xlink:href',d=>'assets/images/'+d.logo+'-logo.png')
		.attr('width',20)
		.attr('height',20)
		.attr('scale',0.5)
		.attr('y',spacing-20)
		.attr('x',-45)
//Bars
barGroups.append('rect')
		.attr('class','data-bar')
		.attr('height',spacing-5)
		.attr('width',0)
		.attr('x',0)
		.attr('y',spacing/4)
		.transition()
		.duration(d=>d.units*7)
		.attr('width',d=>xScale(d.units))
		.attr('fill',(d,i)=>colGen(i));


//Title
chart.append('text')
	.attr('class','title')
	.text('Mobile Phone Units Sold Worldwide')
	.attr('text-anchor','middle')
	.attr('x',width/2)
	.attr('y',-20)


//Axis
chart.append('g')
	.attr('transform','translate(0,'+height*1.02+')')
	.call(xAxisGen)

chart.append('text')
		.attr('class','x-label')
		.attr('text-anchor','middle')
		.attr('x',width/2)
		.attr('y',height+40)
		.text('Units Sold (million)')

//Comapny names
// barGroups.append('text')
// 		.text(d=>d.name)
// 		.attr('y',spacing-10)
// 		.attr('alignment-baseline','middle')
// 		.attr('x',-55)
// 		.attr('font-size',12)
// 		.attr('text-anchor','left')


//Tooltips
var tooltip = chart.append('g')
				.attr('opacity',0)

tooltip.append('rect')
	.attr('class','tooltip')
	.attr('pointer-events','none')
	.attr('width',100)
	.attr('height',30)
	.attr('rx',10)

var toolTipText = tooltip.append('text')
						.text('bla')
						.attr('x',50)
						.attr('y',15)
						.attr('text-anchor','middle')	
						.attr('alignment-baseline','middle')
						.attr('fill','black')
						.attr('font-size','11px')
						.attr('font-family','arial')






var barValue = chart.selectAll('.data-bar')


barValue.on('mouseover',function(d){
	toolTipText.text(d.name+': '+d.units)
	tooltip.attr('opacity',1)

	this.setAttribute('opacity',0.6);
});

barValue.on('mouseout',function(d){
	toolTipText.text(d.name+':'+d.units)
	tooltip.attr('opacity',0)
	this.setAttribute('opacity',1);
});

barValue.on('mousemove',function(){
	var mousePos = d3.mouse(this.parentNode.parentNode)
	var xPos = mousePos[0];
	var yPos = mousePos[1];
	tooltip.attr('transform','translate('+xPos+','+yPos+')')

})















