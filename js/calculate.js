var nx = 0;
var ny = 0;

function get_comb(m, n, currentIndex = 0, choseArr = [], result = [])
{
    let mLen = m.length;
		// 可选数量小于项所需元素的个数，则递归终止
	if (currentIndex + n > mLen) {
		return
	}
	for (let i = currentIndex; i < mLen; i++) {
		// n === 1的时候，说明choseArr在添加一个元素，就能生成一个新的完整项了。
		// debugger
		if (n === 1) {
			// 再增加一个元素就能生成一个完整项，再加入到结果集合中
			result.push([...choseArr, m[i]]);
			// 继续下一个元素生成一个新的完整项
			i + 1 < mLen && get_comb(m, n, i + 1, choseArr, result);
			break;
		}
		// 执行到这，说明n > 2，choseArr还需要两个以上的元素，才能生成一个新的完整项。则递归，往choseArr添加元素
		get_comb(m, n - 1, i + 1, [...choseArr, m[i]], result);
	}
	return result;
}

function get_up(para)
{
    var ans = new Array();
    var n = para.length;
    var aux = new Array();
    for(var i=0;i<n;i++)
    {
        aux.push(i);
    }

    for(var i=0;i<n;i++)
    {
        var idx = get_comb(aux,n-i);
        var add = new Fraction(0,1);
        for(var j=0;j<idx.length;j++)
        {
            var mul = new Fraction(1,1);
            for(var k=0;k<n-i;k++)
            {
                mul = mul.multiply(new Fraction(-para[idx[j][k]],1));
            }
            add = add.add(mul);
        }
        ans.push(add);
    }
    ans.push(new Fraction(1,1));
    return ans;
}

function get_para(x,y)
{
    var up = new Array();
    var down = new Array();
    var ans = new Array();
    for(var i=0;i<y.length;i++)
    {
        var para_up = new Array();
        for(var j=0;j<y.length;j++)
        {
            if(i != j)
            {
                para_up.push(x[j]);
            }
        }
        up.push(get_up(para_up));
        var tmp = new Fraction(y[i],1);
        for(var j=0;j<y.length;j++)
        {
            if(i != j)
            {
                tmp = tmp.divide(new Fraction(x[i] - x[j],1));
            }
        }
        down.push(tmp);
    }

    for(i=0;i<y.length;i++)
    {
        var add = new Fraction(0,1);
        for(j=0;j<y.length;j++)
        {
            add = add.add(up[j][i].multiply(down[j]));
        }
        ans.push(add);
    }

    nx = x[0];
    for(var i=1;i<y.length;i++)
    {
        if(x[i] > nx)
        {
            nx = x[i];
        }
    }
    nx++;
    ny = new Fraction(0,1);
    for(var i=0;i<y.length;i++)
    {
        ny = ny.add(ans[i].multiply((nx ** i)));
    }

    return ans;
}


function out(x,y)
{
    if(x.length == 0)
    {
        for(var i=0;i<y.length;i++)
        {
            x.push(i+1);
        }
    }
    var ans = get_para(x,y);
    var s = "";
    for(var i=y.length-1;i>=0;i--)
    {
        if(ans[i].numerator == 0)
        {
            continue;
        }
        if(ans[i].numerator > 0)
        {
            if(s.length > 0)
            {
                s += '+';
            }
            if(!((ans[i].numerator == 1 && ans[i].denominator == 1)) || (ans[i].numerator == 1 && ans[i].denominator == 1 && i == 0))
            {
                s += ans[i].show();
            }
        }
        else if(ans[i].numerator < 0)
        {
            if(!((ans[i].numerator == -1 && ans[i].denominator == 1)))
            {
                s += ans[i].show();
            }
            else if(i != 0)
            {
                s += '-';
            }
            else
            {
                s += '-1';
            }
        }

        if(i >= 2)
        {
            s += 'n^{' + i.toString() + '}';
        }
        else if(i == 1)
        {
            s += 'n'
        }
    }
    if(s.length == 0)
    {
        s = '0';
    }
    s = 'f(n) = ' + s;
    return s;
}
