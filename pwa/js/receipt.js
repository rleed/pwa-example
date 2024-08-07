const receipt = v = new fgp.View(null)
v.name = Object.keys({receipt}).pop()
v.designSize = 64*40
v.splashMode = 0
v.frameTimes = []
v.bgColor = [.9,.9,.9,1]
v.loadingColor = [1-v.bgColor[0],1-v.bgColor[1],1-v.bgColor[2],1]
v.loadingText = "PWA"
v.setText = function(text) {
  this.loadingText = text
  console.log('receipt:', text)
}
v.finish = function(text) {
  if (text) this.loadingText = text
}
v.renderFunc = function() {
  const v = this, gl = glp
  gl.clearColor(...v.bgColor)
  gl.clear(gl.COLOR_BUFFER_BIT)
  const mat = mat4.create()
  mat4.identity(mat)
  if (v.splashMode == 0 || v.splashMode == 1) {
    const str = v.loadingText
    const x = 0 // (v.sw - receiptFont.calcWidth(str))/2
    const y = 14 // (v.sh)/2
    receiptFont.draw(x,y, str, v.loadingColor, v.mat, mat)

    const now = new Date().getTime()
    let nowPrime = now
    if (v.splashMode == 0) {
      v.frameTimes.push(now)
      if (v.frameTimes.length > 30) {
        nowPrime = v.frameTimes.splice(0,1)
      }
    } else if (v.splashMode = 1) {
      if (v.loadingColor[0] > 0) {
        let val = Math.max(0,v.loadingColor[0]-1/30)
        v.loadingColor = [val, val, val, 1]
      } else {
        v.splashMode = 2
      }
    }
    if (v.loadingFinished) {
      if (v.splashMode == 0) {
        if (now - nowPrime >= 490) {
          v.splashMode = 1
        } else {
          v.splashMode = 2
        }
      }
    }
  } else if (v.splashMode == 2) {
    loadAccount()
    if (pinsettings.enablepin.state && securitypane.mode === 'unlock') {
      fgp.setRoot(securitypane)
    } else {
      fgp.setRoot(home)
    }
  }
  // this.setRenderFlag(true)
}
