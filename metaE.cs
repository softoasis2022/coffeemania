using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Myobj : MonoBehaviour
{

    private GameObject myviewCamera;
    private GameObject My;
    void Start()
    {
        // "Myview"라는 이름의 카메라 오브젝트를 찾음
        myviewCamera = GameObject.Find("Myview");

        // 카메라가 제대로 찾아졌는지 확인
        if (myviewCamera == null)
        {
            Debug.LogError("Myview 카메라를 찾을 수 없습니다.");
        }
        My = GameObject.Find("My");
        if (My == null)
        {
            Debug.LogError("캐릭터가 생성되지 않았습니다.");
        }
        if (myviewCamera != null)
        {
            // Myview 카메라의 위치를 가져와서 출력
            //myviewCamera.transform.position;
            Vector3 cameraPosition = new Vector3(0, 30, -30);
            Debug.Log("Myview Camera Position: " + cameraPosition);
            Vector3 MyPosition = My.transform.position;
            Debug.Log("Myview Camera Position: " + MyPosition);
            myviewCamera.transform.position = MyPosition + cameraPosition;
            Vector3 cam = new Vector3(30,0,0);
            myviewCamera.transform.Rotate(cam);
        }
    }

    
    void Update()
    {
        

        if (Input.GetKey(KeyCode.A)) //왼
        {
            Vector3 vec = new Vector3(-0.3f, 0 , 0);
            transform.Translate(vec);
            if (myviewCamera != null)
            {
                // Myview 카메라의 위치를 가져와서 출력
                //myviewCamera.transform.position;
                Vector3 cameraPosition = new Vector3(0, 30, -30);
                Debug.Log("Myview Camera Position: " + cameraPosition);
                Vector3 MyPosition = My.transform.position;
                Debug.Log("Myview Camera Position: " + MyPosition);

                myviewCamera.transform.position = MyPosition + cameraPosition;
            }
        }
        if (Input.GetKey(KeyCode.W))//앞
        {
            Vector3 vec = new Vector3(0, 0, 0.3f);
            transform.Translate(vec);
            if (myviewCamera != null)
            {
                // Myview 카메라의 위치를 가져와서 출력
                //myviewCamera.transform.position;
                Vector3 cameraPosition = new Vector3(0, 30, -30);
                Debug.Log("Myview Camera Position: " + cameraPosition);
                Vector3 MyPosition = My.transform.position;
                Debug.Log("Myview Camera Position: " + MyPosition);

                myviewCamera.transform.position = MyPosition + cameraPosition;
            }
        }
        if (Input.GetKey(KeyCode.D)) //오
        {
            Vector3 vec = new Vector3(0.3f, 0, 0);
            transform.Translate(vec);
            if (myviewCamera != null)
            {
                // Myview 카메라의 위치를 가져와서 출력
                //myviewCamera.transform.position;
                Vector3 cameraPosition = new Vector3(0, 30, -30);
                Debug.Log("Myview Camera Position: " + cameraPosition);
                Vector3 MyPosition = My.transform.position;
                Debug.Log("Myview Camera Position: " + MyPosition);

                myviewCamera.transform.position = MyPosition + cameraPosition;
            }
        }
        if (Input.GetKey(KeyCode.S)) //뒤
        {
            Vector3 vec = new Vector3(0, 0, - 0.3f);
            transform.Translate(vec);
            if (myviewCamera != null)
            {
                // Myview 카메라의 위치를 가져와서 출력
                //myviewCamera.transform.position;
                Vector3 cameraPosition = new Vector3(0, 30, -30);
                Debug.Log("Myview Camera Position: " + cameraPosition);
                Vector3 MyPosition = My.transform.position;
                Debug.Log("Myview Camera Position: " + MyPosition);

                myviewCamera.transform.position = MyPosition + cameraPosition;
            }
        }
        
    }
    
}


