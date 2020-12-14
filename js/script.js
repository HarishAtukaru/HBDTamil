RGBA(`
    vec2 uv = gl_FragCoord.xy/resolution - 0.5;
    
    uv *= 14.;
    uv.x *= resolution.x/resolution.y;
    uv += time;
    
    float d = 4.0;
    float a = 1.0 - 1.0/d;
    float t0 = time/2.0;
    float t1 = max(0.0, fract(t0) - a)*d;
    float t2 = max(0.0, fract(t0+0.5) - a)*d;
    
    vec2 cell = floor(uv);
    uv = fract(uv) - 0.5;
    float c = mod(cell.x + cell.y, 2.0);
    
    if (t1 > 0.0) {
        float t = 0.5 - sin(t1*3.1415)*0.2;
        c = c<0.5 && abs(uv.x)<t  ? 0.0 : 1.0;
    } 
    
    if (t2 > 0.0) {
        float t = 0.5 - sin(t2*3.1415)*0.2;
        c = c>0.5 &&  abs(uv.y)<t ? 1.0 : 0.0;
    } 
    
    gl_FragColor = vec4(vec3(c), 1.);
`)