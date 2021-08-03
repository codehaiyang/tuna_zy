import {Tabs, Carousel, List, Row, Col, Icon, Alert, Spin, Progress} from 'antd'
import styles from './index.less'

import {PageContainer} from "@ant-design/pro-layout";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

// import {IconFont} from '@ant-design/icons'
import QueueAnim from "rc-queue-anim";
import {Component, useState, memo, createRef, useEffect, forwardRef} from 'react';
import {history, connect} from 'umi';
import {dateFormat, getIsvSelectedSite, moduleNameFormat} from '@/utils/utils';

import _ from 'lodash'

const {TabPane} = Tabs;


/**
 *  详细视图组件
 * @param props
 * @constructor
 */
function DetailImages(props) {
  const {summaryInfo, imgIndex} = props;
  return <div className={styles.analysis_detail}>
    {
      summaryInfo.SummaryOutputImages.Views[imgIndex].Filenames.map((img, index) => {
        let width = 0;
        let height = 0;
        return <canvas id={`${img}_${index}`} className={styles.canvas_s} key={`${img}_${index}`}>
          {
            setTimeout(() => {
              if (document.getElementById(`${img}_${index}`)) {
                const image = new Image();
                image.src = `http://192.168.0.43${img}?m=${Math.random()}`;
                image.onload = function () {
                  width = image.width;
                  height = image.height;
                  const canvasEle = document.getElementById(`${img}_${index}`);
                  canvasEle.width = width;
                  canvasEle.height = height - 100;
                  const ctx = canvasEle.getContext("2d");
                  ctx.drawImage(image, 0, 0, width, height - 100, 0, 0, width, height - 100);
                }
              }

            }, 500)
          }
        </canvas>;
      })
    }
  </div>;
}



/**
 * 略缩图组件
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ThumbnailImages(props) {
  // Classification
  const ref = createRef();
  const {imgData, handleImgChange, moudle} = props;
  const [translateX, setTranslateX] = useState(0); // 每次偏移数值

  // 选中样式
  const [isShow, setShow] = useState(0);

  // 图片尺寸
  let width = 128;
  let height = 112;
  if (moudle === 'Octopus') {
    width = 640;
    height = 460;
  }
  /**
   * 点击右侧按钮
   */
  const clickRightIcon = () => {
    if (ref.current.scrollWidth < Math.abs(translateX) + Math.abs(ref.current.offsetWidth)) {// 到最后一页时候需要停止点击按钮
      return;
    }
    setTranslateX(translateX - ref.current.offsetWidth); // 每次滚动可见区域宽度
  };

  /**
   * 点击左侧按钮
   */
  const clickLeftIcon = () => {
    if (translateX === 0 ) return;
    setTranslateX(translateX + ref.current.offsetWidth);
  };

  /**
   * 点击略缩图事件
   * @param index
   */
  function handleClick(index) {
    handleImgChange(index)// 变更详细图
    setShow(index);// 当前选中加上样式
  }

  return (
    <div className={styles.wrap_scrollImg}>
      <LeftOutlined className={styles.left_icon} onClick={clickLeftIcon}/>
      <RightOutlined className={styles.right_icon} onClick={clickRightIcon}/>
      <ul style={{transform: `translateX(${translateX}px)`}} ref={ref}>
        {imgData.map((item, index) => {
          return (<li onClick={() => handleClick(index)} className={isShow === index ? styles.showBorder : ''}
                      key={`${item.Description}_${index}}`}>
            <canvas id={item.Filenames[0]} width={width} height={height} className={styles.canvas_s}>
              {
                setTimeout(() => {
                  if (document.getElementById(item.Filenames[0])) {
                    const image = new Image();
                    image.src = `http://192.168.0.43${item.ThumbnailFilenames[0]}?m=${Math.random()}`;
                    image.onload = function () {// 图片加载完之后获取画布 进行绘制
                      const ctx = document.getElementById(item.Filenames[0]).getContext("2d");
                      ctx.drawImage(image, 0, 0, width, height, 0, 0, width, height);
                    }
                  }

                }, 500)
              }
            </canvas>
            <span className={styles.ThumbnailDescription}> {item.Description}</span>
          </li>);
        })}
      </ul>
    </div>
  );
}


const TabsEle = (props) => {

  // 从父组件获取单项结果
  const {singleResultView, imgShow} = props;

  // 当前组件图片所在数据数组标识
  const [imgIndex, setImgIndex] = useState(0);

  // 处理缩略图点击事件 点击略缩图用于修改下面大图
  function handleImgChange(ThumbnailIndex) {
    setImgIndex(ThumbnailIndex);
  }


  // 当前tab页的描述
  let description = '';
  // 获取summaryInfo
  const {summaryInfo} = singleResultView;


  if (summaryInfo.DICOMHeaderInfo.AngioSeries) {
    // CTA
    description = summaryInfo.DICOMHeaderInfo.AngioSeries[0].SeriesDescription
  } else if (summaryInfo.DICOMHeaderInfo.PerfusionSeries) {
    // 灌注
    description = summaryInfo.DICOMHeaderInfo.PerfusionSeries[0].SeriesDescription
  } else if (summaryInfo.DICOMHeaderInfo.NCCTSeries) {
    // 平扫
    description = summaryInfo.DICOMHeaderInfo.NCCTSeries.SeriesDescription
  }


  return <Spin spinning={imgShow}>
    <Row>
      <Col span={24}>
        <Alert
          message={`处理成功:${summaryInfo.DICOMHeaderInfo.Patient.PatientName}`}
          description={
            <span>序列:
              {
                description
              }</span>
          }
          type="success"
          showIcon
        />
      </Col>

      {/* 略缩图 */}
      <Col span={24}>
        <ThumbnailImages imgData={summaryInfo.SummaryOutputImages.Views} moudle={singleResultView.modulename}
                         handleImgChange={handleImgChange}/>
      </Col>

      {/* 大图 */}
      <Col span={24}>
        <DetailImages summaryInfo={summaryInfo} imgIndex={imgIndex}/>
      </Col>
    </Row>
  </Spin>;
}


const Analysis = (props) => {
    const {patientid} = Object.assign(history.location.query);
    const {dispatch} = props;
    const {sitename} = getIsvSelectedSite();
    // 初始化患者结果视图
    useEffect(() => {
      dispatch({
        type: 'patient/gainPatientViewInit',
        payload: {
          sitename,
          patientid
        }
      })
    }, []);
    // 获取初始化数据
    const {patientViewList, demandProcess} = props;

    // 判断数据是否在处理中
    let isLoading = false;


    // 加载图片进度条 只是动画不涉及判断
    const [imgShow, setImgShow] = useState(true);
    setTimeout(() => {
      setImgShow(false);
    }, 2000);

    return (
      <PageContainer>
        <QueueAnim duration={500}>
          {
            // 如果没有当前任务队列表示处理失败
            !demandProcess ? (
              <Tabs defaultActiveKey={0}
                    animated={'true'}>
                <TabPane><Alert type={'error'} message={'当前结果处理失败，请检查'}/></TabPane>
              </Tabs>
            ) : (
              <Tabs defaultActiveKey={0}
                    animated={'true'}>
                {
                  patientViewList.map((item, index) => {
                    if (item.taskstatus === 'RUNNING') {
                      isLoading = true;
                      return (<TabPane>
                        <Spin spinning={isLoading} key={`${item.patientid}_${index}`}>
                          <Alert message={'当前结果正在处理...请稍后'}/>
                        </Spin>
                      </TabPane>)
                    }

                    // 汉化当前模块 名称
                    const moduleTitle = moduleNameFormat(item.modulename);

                    return (
                      <TabPane forceRender={true} tab={`${moduleTitle}-${dateFormat(item.startdatetime)}`} key={index}>
                         <TabsEle singleResultView={item} key={`${item.patientid}_${index}`} imgShow={imgShow}/>
                      </TabPane>
                    );
                  })
                }
              </Tabs>
            )
          }
        </QueueAnim>
      </PageContainer>
    );
  }
;


export default connect((
  {
    patient, loading
  }
  ) => {
    return {
      patientViewList: patient.patientViewList,
      demandProcess: patient.demandProcess,
      taskProgressStatus: patient.taskProgressStatus,
      loading: loading.effects['patient/gainPatientViewInit']
    }
  }
)
(Analysis);




