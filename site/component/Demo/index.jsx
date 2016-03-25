import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Animate from 'rc-animate';
import * as utils from '../utils';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeExpand: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expand === undefined) return;

    this.setState({
      codeExpand: nextProps.expand,
    });
  }

  handleCodeExapnd() {
    this.setState({ codeExpand: !this.state.codeExpand });
  }

  render() {
    const { id, className, meta, intro, preview, style, src,
            highlightedCode, highlightedStyle, pathname } = this.props;
    const codeExpand = this.state.codeExpand;
    const codeBoxClass = classNames({
      'code-box': true,
      [className]: className,
      expand: codeExpand,
    });
    const introChildren = intro.map(utils.objectToComponent.bind(null, pathname));

    return (
      <section className={codeBoxClass} id={id}>
        <section className="code-box-demo">
          {
            meta.iframe === 'true' ?
              <iframe src={src} /> :
              preview
          }
          {
            !!style ?
              <style dangerouslySetInnerHTML={{ __html: style }} /> :
              null
          }
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Link to={{ pathname, query: { scrollTo: id } }}>
              { meta.chinese || meta.english }
            </Link>
          </div>
          { introChildren }
          <span className="collapse anticon anticon-circle-o-right"
            onClick={this.handleCodeExapnd.bind(this)}
            unselectable="none" />
        </section>
        <Animate
          transitionEnter transitionLeave>
          {
            codeExpand ?
              <section key="code">
                <div className="highlight">
                  <pre>
                    <code className="javascript" dangerouslySetInnerHTML={{
                      __html: highlightedCode,
                    }} />
                  </pre>
                </div>
                {
                  style ?
                    <div key="style" className="highlight">
                      <pre>
                        <code className="css" dangerouslySetInnerHTML={{
                          __html: highlightedStyle,
                        }} />
                      </pre>
                    </div> :
                    null
                }
              </section> : <div key="nothing" />
          }
        </Animate>
      </section>
    );
  }
}