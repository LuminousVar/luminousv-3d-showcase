uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    uv.x += uTime * 0.01;
    vec4 texColor = texture2D(uTexture, uv);
    gl_FragColor = texColor;
}
