precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_teeth;

varying vec2 vectorCoord;

#define Pi 3.14159265359

struct Gear
{
    float t;            // Time
    float gearR;        // Gear radius
    float teethH;       // Teeth height
    float teethR;       // Teeth "roundness"
    float teethCount;   // Teeth count
    float diskR;        // Inner or outer border radius
    vec3 color;	        // Color
};
    
float GearFunction(vec2 uv, Gear g)
{
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    
    // Gear polar function:
    //  A sine squashed by a logistic function gives a convincing
    //  gear shape!
    float p = g.gearR-0.5*g.teethH + 
              g.teethH/(1.0+exp(g.teethR*sin(g.t + g.teethCount*a)));

    float gear = r - p;
    float disk = r - g.diskR;
    
    return g.gearR > g.diskR ? max(-disk, gear) : max(disk, -gear);
}

float GearDe(vec2 uv, Gear g)
{
    // IQ's f/|Grad(f)| distance estimator:
    float f = GearFunction(uv, g);
    vec2 eps = vec2(0.0001, 0);
    vec2 grad = vec2(
        GearFunction(uv + eps.xy, g) - GearFunction(uv - eps.xy, g),
        GearFunction(uv + eps.yx, g) - GearFunction(uv - eps.yx, g)) / (2.0*eps.x);
    
    return (f)/length(grad);
}

float GearShadow(vec2 uv, Gear g)
{
    float r = length(uv+vec2(0.1));
    float de = r - g.diskR + 0.0*(g.diskR - g.gearR);
    float eps = 0.4*g.diskR;
    return smoothstep(eps, 0., abs(de));
}

void DrawGear(inout vec3 color, vec2 uv, Gear g, float eps)
{
	float d = smoothstep(eps, -eps, GearDe(uv, g));
    float s = 1.0 - 0.7*GearShadow(uv, g);
    color = mix(s*color, g.color, d);
}

void main() {
    float t = 0.1*u_time;
    vec2 uv = 2.0*(gl_FragCoord.xy - 0.5*u_resolution.xy)/u_resolution.y;
    float eps = 2.0/u_resolution.y;

    // Scene parameters;
	vec3 color = vec3(vectorCoord, 1.0);
    const float count = 3.0;
    
    vec3 bg_color = vec3(0.0);
    
    float inner_radius = 0.2;
    float outer_radius = 0.4;

    Gear base_gear = Gear(0.0, outer_radius, 0.15, 5.0, u_teeth, inner_radius, color);

    for(float i=0.0; i<count; i++)
    {
        base_gear.color = color/2.0*(i+1.0);
 	    base_gear.t = t;
        base_gear.diskR = inner_radius;
        base_gear.gearR = outer_radius;
        DrawGear(bg_color, uv, base_gear, eps);

        inner_radius+=0.2;
        outer_radius+=0.2;
        t = -t;
    }
    
    gl_FragColor = vec4(bg_color,1.0);
}